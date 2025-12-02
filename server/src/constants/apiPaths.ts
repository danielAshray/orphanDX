export class ApiPaths {
  static Event = class {
    static readonly GET_EVENTS = "/";
  };

  static Lab = class {
    static readonly GET_LAB_BY_ID = "/:id";
    static readonly GET_LABS = "/";
    static readonly POST_LAB = "/";
  };

  static Main = class {
    static readonly EVENT = "/event";
    static readonly LAB = "/lab";
    static readonly ORDER = "/order";
    static readonly TEST = "/test";
    static readonly USER = "/user";
  };

  static Order = class {
    static readonly GET_ORDER_BY_ID = "/:id";
    static readonly GET_ORDERS = "/";
    static readonly POST_ORDER = "/";
  };

  static Patient = class {
    static readonly DELETE_PATIENT_BY_ID = "/:id";
    static readonly GET_PATIENT_BY_ID = "/:id";
    static readonly GET_PATIENTS = "/";
    static readonly POST_PATIENT = "/";
    static readonly UPDATE_PATIENT_BY_ID = "/:id";
  };

  static Patient_Recommendation = class {
    static readonly DELETE_PATIENT_RECOMMENDATION_BY_ID = "/:id";
    static readonly GET_PATIENT_RECOMMENDATION_BY_ID = "/:id";
    static readonly GET_PATIENT_RECOMMENDATIONS = "/";
    static readonly POST_PATIENT_RECOMMENDATION = "/";
    static readonly UPDATE_PATIENT_RECOMMENDATION_BY_ID = "/:id";
  };

  static Practice = class {
    static readonly DELETE_PRACTICE_BY_ID = "/:id";
    static readonly GET_PRACTICE_BY_ID = "/:id";
    static readonly GET_PRACTICES = "/";
    static readonly POST_PRACTICE = "/";
    static readonly UPDATE_PRACTICE_BY_ID = "/:id";
  };

  static Provider = class {
    static readonly DELETE_PROVIDER_BY_ID = "/:id";
    static readonly GET_PROVIDER_BY_ID = "/:id";
    static readonly GET_PROVIDERS = "/";
    static readonly POST_PROVIDER = "/";
    static readonly UPDATE_PROVIDER_BY_ID = "/:id";
  };

  static Test = class {
    static readonly POST_RECOMMEND_TEST = "/recommend";
    static readonly GET_TEST_BY_ID = "/:id";
    static readonly GET_TESTS = "/";
    static readonly POST_TEST = "/";
  };

  static Test_Eligibility_Rule = class {
    static readonly GET_TEST_ELIGIBILITY_RULE_BY_ID = "/:id";
    static readonly GET_TEST_ELIGIBILITY_RULES = "/";
    static readonly POST_TEST_ELIGIBILITY_RULE = "/";
  };

  static User = class {
    static readonly GET_PROFILE = "/";
    static readonly LOGIN = "/login";
    static readonly REFRESH_TOKEN = "/refresh";
    static readonly REGISTER = "/register";
  };
}
