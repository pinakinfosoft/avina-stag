import { Request } from "express";
import {
  addActivityLogs,
  columnValueLowerCase,
  getCompanyIdBasedOnTheCompanyKey,
  getLocalDate,
  resBadRequest,
  resNotFound,
  resSuccess,
} from "../../../utils/shared-functions";
import { Op, Sequelize } from "sequelize";
import { ADDRESS_NOT_EXITS, DEFAULT_STATUS_CODE_SUCCESS, Id_IS_REQUIRED } from "../../../utils/app-messages";
import { ActiveStatus, DeletedStatus, LogsActivityType, LogsType } from "../../../utils/app-enumeration";
import { CityData } from "../../model/master/city.model";
import { UserAddress } from "../../model/address.model";
import { StateData } from "../../model/master/state.model";
import { CountryData } from "../../model/master/country.model";

export const addUserAddress = async (req: Request) => {
  const {
    user_id,
    house_building,
    area_name,
    pincode,
    city_id,
    state_id,
    country_id,
    full_name,
    address_type,
    default_addres,
    phone_number,
  } = req.body;

  const cityNameExistes = await CityData.findOne({
    where: [columnValueLowerCase("city_name", city_id), { is_deleted: DeletedStatus.No }],
  });

  let cityCreateId: any;
  if (cityNameExistes && cityNameExistes.dataValues) {
    cityCreateId = cityNameExistes.dataValues.id;
  } else {
    const created = await CityData.create({
      city_name: city_id,
      city_code: city_id,
      id_state: state_id,
      created_date: getLocalDate(),
      is_active: ActiveStatus.Active,
      is_deleted: DeletedStatus.No,
    });
    cityCreateId = created.dataValues.id;
  }

  try {
    const payload = {
      user_id: user_id,
      full_name: full_name,
      house_building: house_building,
      area_name: area_name,
      pincode: pincode,
      phone: phone_number,
      city_id: cityCreateId,
      state_id: state_id,
      country_id: country_id,
      address_type: address_type || 1,
      default_addres: default_addres,
      is_deleted: 0,
      created_date: getLocalDate(),
    };

    const UserAddressData = await UserAddress.create(payload);

      await addActivityLogs([{
        old_data: null,
        new_data: {
          address_id: UserAddressData?.dataValues?.id, data: {
            ...UserAddressData?.dataValues
          }
        }
      }], UserAddressData?.dataValues?.id, LogsActivityType.Add, LogsType.Address, req?.body?.session_res?.id_app_user)
      
    return resSuccess({ data: payload });
  } catch (error) {
    throw error;
  }
};

export const getUserAddress = async (req: Request) => {
  try {
    if (req.body.user_id != null) {
      const userAddress = await UserAddress.findAll({
        where: {
          user_id: {
            [Op.eq]: req.body.user_id,
          },
          is_deleted: DeletedStatus.No,
        },
        attributes: [
          "id",
          "full_name",
          "house_building",
          "area_name",
          "pincode",
          ["phone", "phone_number"],
          "city_id",
          "state_id",
          "country_id",
          "address_type",
          "default_addres",
          "created_date",
          [Sequelize.literal('"city"."city_name"'), "city_name"],
          [Sequelize.literal('"state"."state_name"'), "state_name"],
          [Sequelize.literal('"country"."country_name"'), "country_name"],
        ],
        include: [
          {
            model: CityData,
            as: "city",
            attributes: []
            ,required:false
          },
          {
            model: StateData,
            as: "state",
            attributes: []
            ,required:false
          },
          {
            model: CountryData,
            as: "country",
            attributes: []
            ,required:false
          },
        ],
      });
      return resSuccess({ data: userAddress });
    } else {
      return resBadRequest({ message: Id_IS_REQUIRED });
    }
  } catch (error) {
    throw error;
  }
};

export const updateUserAddress = async (req: Request) => {
  const {
    id,
    house_building,
    area_name,
    pincode,
    city_id,
    state_id,
    country_id,
    full_name,
    address_type,
    default_addres,
    phone_number,
  } = req.body;
  try {

    const addressId = await UserAddress.findOne({
      where: { id: id, is_deleted: DeletedStatus.No },
    });
    const cityNameExistes = await CityData.findOne({
      where: [columnValueLowerCase("city_name", city_id), { is_deleted: DeletedStatus.No }],
    });

    let cityCreateId: any;
    if (cityNameExistes && cityNameExistes.dataValues) {
      cityCreateId = cityNameExistes.dataValues.id;
    } else {
      const created = await CityData.create({
        city_name: city_id,
        city_code: city_id,
        id_state: state_id,
        created_date: getLocalDate(),
        is_active: ActiveStatus.Active,
        is_deleted: DeletedStatus.No,
      });
      cityCreateId = created.dataValues.id;
    }

    if (addressId) {
      const addressInfo = await UserAddress.update(
        {
          house_building: house_building,
          full_name: full_name,
          area_name: area_name,
          pincode: pincode,
          phone: phone_number,
          city_id: cityCreateId,
          state_id: state_id,
          country_id: country_id,
          address_type: address_type,
          default_addres: default_addres,
          modified_date: getLocalDate(),
        },
        { where: { id: addressId.dataValues.id, is_deleted: DeletedStatus.No } }
      );
      if (addressInfo) {
        const CityInformation = await UserAddress.findOne({
            where: { id: id, is_deleted: DeletedStatus.No },
          attributes: [
            "id",
            "full_name",
            "house_building",
            "area_name",
            "pincode",
            ["phone", "phone_number"],
            "city_id",
            "state_id",
            "country_id",
            "address_type",
            "default_addres",
            "created_date",
            [Sequelize.literal('"city"."city_name"'), "city_name"],
          ],
          include: [
            {
              model: CityData,
              as: "city",
              attributes: [],
              required:false
            },
          ],
        });

        
      await addActivityLogs([{
        old_data: { address_id: addressId?.dataValues?.id, data: {...addressId?.dataValues},city_name_existes_id : cityNameExistes?.dataValues?.id, cityNameExistedata: {...cityNameExistes?.dataValues} },
        new_data: {
          address_id: CityInformation?.dataValues?.id, data: { ...CityInformation.dataValues }
        }
      }], addressId?.dataValues?.id, LogsActivityType.Edit, LogsType.Address, req?.body?.session_res?.id_app_user)
      
        return resSuccess({ data: CityInformation });
      }
    } else {
      return resNotFound({ message: ADDRESS_NOT_EXITS });
    }
  } catch (error) {
    throw error;
  }
};

export const deleteUserAddress = async (req: Request) => {
  try {

    const addressExists = await UserAddress.findOne({
      where: { id: req.body.id, is_deleted: DeletedStatus.No },
    });

    if (!(addressExists && addressExists.dataValues)) {
      return resNotFound();
    }
    await UserAddress.update(
      {
        is_deleted: DeletedStatus.yes,
        modified_date: getLocalDate(),
      },
      { where: { id: addressExists.dataValues.id } }
    );

    await addActivityLogs([{
      old_data: { address_id: addressExists?.dataValues?.id, data: addressExists?.dataValues },
      new_data: {
        address_id: addressExists?.dataValues?.id, data: {
          ...addressExists?.dataValues, is_deleted: DeletedStatus.yes,
          modified_by: req?.body?.session_res?.id_app_user,
          modified_date: getLocalDate(),
        }
      }
    }], addressExists?.dataValues?.id, LogsActivityType.Delete, LogsType.Address, req?.body?.session_res?.id_app_user)

    return resSuccess({});
  } catch (error) {
    throw error;
  }
};
