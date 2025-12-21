import { Request } from "express";
import { Sequelize, Op } from "sequelize";
import { IQueryPagination } from "../../data/interfaces/common/common.interface";
import { moveFileToS3ByType } from "../../helpers/file.helper";
import { ActiveStatus, DeletedStatus, IMAGE_TYPE, LogsActivityType, LogsType } from "../../utils/app-enumeration";
import { DEFAULT_STATUS_CODE_SUCCESS, DEFAULT_STATUS_SUCCESS, RECORD_UPDATE_SUCCESSFULLY } from "../../utils/app-messages";
import { addActivityLogs, getInitialPaginationFromQuery, getLocalDate, resErrorDataExit, resNotFound, resSuccess } from "../../utils/shared-functions";
import { TestimonialData } from "../model/testimonial.model";
import { Image } from "../model/image.model";
import dbContext from "../../config/db-context";

export const addtestimonial = async (req: Request) => {
    try {
    const {designation ,name, text, created_by } = req.body
  
      let imagePath = null;
      if (req.file) {
        const moveFileResult = await moveFileToS3ByType(
          req.file,
          IMAGE_TYPE.testimonial,
        );
  
        if (moveFileResult.code !== DEFAULT_STATUS_CODE_SUCCESS) {
          return moveFileResult;
        }
  
        imagePath = moveFileResult.data;
      }
  
      const trn = await dbContext.transaction();
  
      try {
        let idImage = null;
        if (imagePath) {
          const imageResult = await Image.create(
            {
              image_path: imagePath,
              image_type: IMAGE_TYPE.testimonial,
              created_by: req.body.session_res.id_app_user,
              created_date: getLocalDate(),
            },
            { transaction: trn }
          );
          idImage = imageResult.dataValues.id;
        }
        const payload = {
          person_name: name,
          designation: designation,
          text: text,
          created_date: getLocalDate(),
          created_by: req.body.session_res.id_app_user,
          id_image: idImage,
          is_active: ActiveStatus.Active,
          is_deleted: DeletedStatus.No
      }

        const testimonial = await TestimonialData.create(
          payload,
          { transaction: trn }
        );
        await addActivityLogs([{
          old_data: null,
          new_data: {
            testimonial_id: testimonial?.dataValues?.id, data: {
              ...testimonial?.dataValues
            }
          }
        }], testimonial?.dataValues?.id, LogsActivityType.Add, LogsType.Testimonial, req?.body?.session_res?.id_app_user,trn)
                  
        await trn.commit();
          return resSuccess({data: payload});

      
      } catch (e) {
        await trn.rollback();
        throw e;
      }
    } catch (e) {
      throw e;
    }
  }

  export const getAllTestimonial = async (req: Request) => {
    try {
        let pagination: IQueryPagination = {
            ...getInitialPaginationFromQuery(req.query),
          };
      
          let where = [
            { is_deleted: DeletedStatus.No },
            {
              [Op.or]: [
                  { person_name: { [Op.iLike]: "%" + pagination.search_text  + "%" } },
                  { designation: { [Op.iLike]: "%" + pagination.search_text + "%" } },

              ],
              is_deleted : "0"
          }
          ];
      
          const totalItems = await TestimonialData.count({
            where,
          });
      
          if (totalItems === 0) {
            return resSuccess({ data: { pagination, result: [] } });
          }
          pagination.total_items = totalItems;
          pagination.total_pages = Math.ceil(totalItems / pagination.per_page_rows);

          const result = await TestimonialData.findAll({
            where,
            limit: pagination.per_page_rows,
            offset: (pagination.current_page - 1) * pagination.per_page_rows,
            order: [[pagination.sort_by, pagination.order_by]],
            attributes: [
              "id",
              "person_name",
              "designation",
              "text",
              [Sequelize.literal("image.image_path"), "image_path"],
              "created_date",
              "is_active",
              "created_by"
            ],
            include: [{ model: Image, as: "image", attributes: [], required:false }],
          });

        return resSuccess({ data: { pagination, result } })

    } catch (error) {
        throw error
    }

}

export const getByIdTestimonial = async (req: Request) => {
  try {
    const testimonialInfo = await TestimonialData.findOne({ where: { id: req.params.id, is_deleted: DeletedStatus.No },  attributes: [
        "id",
        "person_name",
        "designation",
        "text",
        [Sequelize.literal("image.image_path"), "image_path"],
        "created_date",
        "is_active",
        "created_by"
      ],
      include: [{ model: Image, as: "image", attributes: [], required:false}], });

    if (!(testimonialInfo && testimonialInfo.dataValues)) {
        return resNotFound();
      }


  return resSuccess({data: testimonialInfo});
  } catch (error) {
    throw error
    
  }
}

export const updateTestimonial = async (req: Request) => {
    const {id, name, designation, text, updated_by} = req.body
  
  try {
      const TestimonialId = await TestimonialData.findOne({ where: { id: id, is_deleted: DeletedStatus.No } })
  
    if (TestimonialId == null) {
      return resErrorDataExit() 
    }
  
    let id_image = null;
    let imagePath = null;
  
    if (req.file) {
      const moveFileResult = await moveFileToS3ByType(
        req.file,
        IMAGE_TYPE.testimonial,
      );
  
      if (moveFileResult.code !== DEFAULT_STATUS_CODE_SUCCESS) {
        return moveFileResult;
      }
  
      imagePath = moveFileResult.data;
    }
  
    const trn = await dbContext.transaction();
    try {
      if (imagePath) {
        const imageResult = await Image.create(
          {
            image_path: imagePath,
            image_type: IMAGE_TYPE.testimonial,
            created_by: req.body.session_res.id_app_user,
            created_date: getLocalDate(),
          },
          { transaction: trn }
        );
  
        id_image = imageResult.dataValues.id;
      }

        const TestimonialInfo = await (TestimonialData.update(
          {
            person_name: name,
            designation: designation,
            text: text,
            id_image: id_image ?? TestimonialId?.dataValues?.id_image,
            modified_date: getLocalDate(),
            modified_by: req.body.session_res.id_app_user
          },
          { where: { id: id, is_deleted: DeletedStatus.No }, transaction: trn  }
        ));

          const TestimonialInformation = await TestimonialData.findOne({ where: { id: id, is_deleted: DeletedStatus.No }, transaction: trn })

          await addActivityLogs([{
            old_data: { testimonial_id: TestimonialId?.dataValues?.id, data: {...TestimonialId?.dataValues}},
            new_data: {
              testimonial_id: TestimonialInformation?.dataValues?.id, data: { ...TestimonialInformation?.dataValues }
            }
          }], TestimonialId?.dataValues?.id,LogsActivityType.Edit, LogsType.Testimonial, req?.body?.session_res?.id_app_user,trn)
        
      await trn.commit();
      return resSuccess({data: TestimonialInformation})
    } catch (e) {
      await trn.rollback();
      throw e;
    }
  
  } catch (error) {
  
    throw(error);
  }
}

export const deletetestimonial = async (req: Request) => {

  try {
        const testimonialExists = await TestimonialData.findOne({ where: { id: req.body.id, is_deleted: DeletedStatus.No } });
    
          if (!(testimonialExists && testimonialExists.dataValues)) {
            return resNotFound();
          }
          await TestimonialData.update(
            {
              is_deleted: DeletedStatus.yes,
              modified_by: req.body.session_res.id_app_user,
              modified_date: getLocalDate(),
            },
            { where: { id: testimonialExists.dataValues.id } }
          );
          await addActivityLogs([{
            old_data: { testimonial_id: testimonialExists?.dataValues?.id, data: {...testimonialExists?.dataValues}},
            new_data: {
              testimonial_id: testimonialExists?.dataValues?.id, data: {
                ...testimonialExists?.dataValues, is_deleted: DeletedStatus.yes,
                modified_by: req?.body?.session_res?.id_app_user,
                modified_date: getLocalDate(),
              }
            }
          }], testimonialExists?.dataValues?.id, LogsActivityType.Delete, LogsType.Testimonial, req?.body?.session_res?.id_app_user)
          
          return resSuccess();
    } catch (error) {
        throw error
    }
  }
  
  export const statusUpdateTestimonial = async (req: Request) => {
    try {
    const testimonialExists = await TestimonialData.findOne({ where: { id: req.body.id, is_deleted: DeletedStatus.No } });
    if (testimonialExists) {
        const testimonialActionInfo = await (TestimonialData.update(
            {
                is_active: req.body.is_active,
                modified_date: getLocalDate(),
                modified_by: req.body.session_res.id_app_user
            },
            { where: { id: testimonialExists.dataValues.id } }
        ));
        if (testimonialActionInfo) {
          await addActivityLogs([{
            old_data: { testimonial_id: testimonialExists?.dataValues?.id, data: {...testimonialExists?.dataValues}},
            new_data: {
              testimonial_id: testimonialExists?.dataValues?.id, data: {
                ...testimonialExists?.dataValues, is_active: req.body.is_active,
                modified_date: getLocalDate(),
                modified_by: req?.body?.session_res?.id_app_user,
              }
            }
          }], testimonialExists?.dataValues?.id, LogsActivityType.StatusUpdate, LogsType.Testimonial, req?.body?.session_res?.id_app_user)
              
            return resSuccess({message: RECORD_UPDATE_SUCCESSFULLY})
        } 
    } else {
        return resNotFound();
    }
  } catch (error) {
    throw error
  }
  }