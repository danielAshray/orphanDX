import Joi, { ObjectSchema } from "joi";
class QuerySchema {
  static readonly Query_Schema: ObjectSchema = Joi.object({
    startIndex: Joi.number().required(),
    sortKey: Joi.string().required().allow(""),
    sortDirection: Joi.string().required().valid("asc", "desc"),
    searchBox: Joi.string().required(),
    timeZone: Joi.string().required(),
  });
}

export default QuerySchema;
