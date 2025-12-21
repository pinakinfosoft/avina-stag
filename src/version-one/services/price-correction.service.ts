import { RECORD_UPDATE_SUCCESSFULLY } from "../../utils/app-messages";
import { getLocalDate, resSuccess } from "../../utils/shared-functions";
import { PriceCorrection } from "../model/price-correction.model";

export const getPriceCorrection = async (req: any) => {
    try {
        const findPriceCorrection = await PriceCorrection.findAll({
            where: { },
            attributes: [
                'id',
                'round_off',
                'product_type',
                'is_active'
            ]
        })

        return resSuccess({ data: findPriceCorrection });
    } catch (error) {
        throw error
    }
};

export const addOrUpdatePriceCorrection = async (req: any) => {
    try {

        const findPriceCorrection = await PriceCorrection.findOne({
            where: { product_type: req.body.product_type }
        })

        if(!(findPriceCorrection && findPriceCorrection.dataValues)){
            await PriceCorrection.create({
                round_off: req.body.round_off,
                product_type: req.body.product_type,
                is_active: req.body.is_active,
                created_by: req.body.session_res.id_app_user,
                created_date: getLocalDate()
            })
        } else {
            await PriceCorrection.update({
                round_off: req.body.round_off,
                product_type: req.body.product_type,
                is_active: req.body.is_active,
                modified_by: req.body.session_res.id_app_user,
                modified_date: getLocalDate()
            }, {
                where: { id: findPriceCorrection.dataValues.id }
            })
        }

        return resSuccess({message: RECORD_UPDATE_SUCCESSFULLY})
    } catch (error) {
        throw error
    }
}