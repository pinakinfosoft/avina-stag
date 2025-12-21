import { Request } from "express";
import {
  getCompanyIdBasedOnTheCompanyKey,
  resSuccess,
} from "../../../utils/shared-functions";
import { ActiveStatus, DeletedStatus } from "../../../utils/app-enumeration";
import {
  DEFAULT_STATUS_CODE_SUCCESS,
} from "../../../utils/app-messages";
import { CountryData } from "../../model/master/country.model";
import { StateData } from "../../model/master/state.model";
import { CityData } from "../../model/master/city.model";
import { CategoryData } from "../../model/category.model";
import { CurrencyData } from "../../model/master/currency.model";

export const countryListCustomerSide = async (req: Request) => {
  try {

    const countryData = await CountryData.findAll({
      where: { is_deleted: DeletedStatus.No, is_active: ActiveStatus.Active },
      attributes: ["id", "country_name", "country_code", "created_date"],
    });

    return resSuccess({ data: countryData });
  } catch (error) {
    throw error;
  }
};

export const stateListCustomerSide = async (req: Request) => {
  try {
    const stateData = await StateData.findAll({
      where: {
        id_country: req.body.country_id,
        is_deleted: DeletedStatus.No,
        is_active: ActiveStatus.Active,
      },
      attributes: ["id", "state_name", "state_code", "created_date"],
    });

    return resSuccess({ data: stateData });
  } catch (error) {
    throw error;
  }
};

export const cityListCustomerSide = async (req: Request) => {
  try {
    const stateData = await CityData.findAll({
      where: { id_state: req.body.state_id, is_deleted: DeletedStatus.No, is_active: ActiveStatus.Active },
      attributes: ["id", "city_name", "city_code", "created_date"],
    });

    return resSuccess({ data: stateData });
  } catch (error) {
    throw error;
  }
};

export const mainCategoryList = async (req: Request) => {
  try {
    const stateData = await CategoryData.findAll({
      where: { parent_id: null, is_deleted: DeletedStatus.No, is_active: ActiveStatus.Active },
      attributes: ["id", "slug", "category_name", "created_date"],
    });

    return resSuccess({ data: stateData });
  } catch (error) {
    throw error;
  }
};

export const currencyListCustomerSide = async (req: Request) => {
  try {
    const currency = await CurrencyData.findAll({
      where: { is_deleted: DeletedStatus.No, is_active: ActiveStatus.Active },
      attributes: ["id", "currency", "rate", "is_default"],
    });

    return resSuccess({ data: currency });
  } catch (error) {
    throw error;
  }
};
