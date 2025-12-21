import { Request } from "express";
import { Info_Key, LogsActivityType, LogsType } from "../../utils/app-enumeration";
import {
  getCompanyIdBasedOnTheCompanyKey,
  addActivityLogs,
  getLocalDate,
  resBadRequest,
  resSuccess,
} from "../../utils/shared-functions";
import {
  DEFAULT_STATUS_CODE_SUCCESS,
  INVALID_INFO_KEY,
  RECORD_UPDATE_SUCCESSFULLY,
} from "../../utils/app-messages";
import { InfoSection } from "../model/info-section.model";

export const addUpdateInfoSection = async (req: Request) => {
  try {
    const { info_key, title, description } = req.body;

    const key = Object.keys(Info_Key).find((t) => Info_Key[t] === info_key);

    if (!key) {
      return resBadRequest({ message: INVALID_INFO_KEY });
    }

    const infoData = await InfoSection.findOne({
      where: {
        key: Info_Key[key],
      },
    });

    if (infoData && infoData.dataValues) {
      await InfoSection.update(
        {
          title,
          description,
          modified_by: req.body.session_res.id_app_user,
          modified_date: getLocalDate(),
        },
        {
          where: {
            key: Info_Key[key],
          },
        }
      );
      const afterUpdateInfoData = await InfoSection.findOne({
        where: {
          key: Info_Key[key],
        },
      });
      addActivityLogs([{
        old_data: { info_section_id: infoData?.dataValues?.id, data: {...infoData?.dataValues}},
        new_data: {
          info_section_id: afterUpdateInfoData?.dataValues?.id, data: { ...afterUpdateInfoData?.dataValues }
        }
      }], infoData?.dataValues?.id,LogsActivityType.Edit, LogsType.InfoSection, req?.body?.session_res?.id_app_user)
        
      return resSuccess({ message: RECORD_UPDATE_SUCCESSFULLY });
    }

    const infoSectiondata = await InfoSection.create({
      key: Info_Key[key],
      title,
      description,
      created_by: req.body.session_res.id_app_user,
      created_at: getLocalDate(),
    });
    await addActivityLogs([{
      old_data: null,
      new_data: {
        info_section_id: infoSectiondata?.dataValues?.id, data: {
          ...infoSectiondata?.dataValues
        }
      }
    }], infoSectiondata?.dataValues?.id, LogsActivityType.Add, LogsType.InfoSection, req?.body?.session_res?.id_app_user)
        
    return resSuccess();
  } catch (error) {
    throw error;
  }
};

export const getInfoSection = async (req: Request) => {
  try {

    const { info_key } = req.params;

    if (!info_key) {
      const data = await InfoSection.findAll({
        attributes: ["id", "key", "title", "description"],
      });

      return resSuccess({ data });
    }

    const infoData = await InfoSection.findOne({
      where: {
        key: info_key,
      },
      attributes: ["id", "key", "title", "description"],
    });

    if (!(infoData && infoData.dataValues)) {
      return resSuccess();
    }

    return resSuccess({ data: infoData.dataValues });
  } catch (error) {
    throw error;
  }
};

export const infoSectionListForUser = async (req: Request) => {
  try {

    const data = await InfoSection.findAll({
      attributes: ["id", "key", "title", "description"],
    });

    return resSuccess({ data });
  } catch (error) {
    throw error;
  }
};
