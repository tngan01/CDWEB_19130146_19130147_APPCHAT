export const INSTALLATION_ID = '@skeleton_installationId';

export const REG_EXP = {
  PASSWORD_POLICY:
    // eslint-disable-next-line no-useless-escape
    /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d!\"#$%&'()*+,-./:;<=>?@^_`{|}~\[\]]{8,}$/,
};
export enum Limit {
  MAX_LIMIT = 10000,
  AGENT_LIST = 10,
}
export enum UserStatus {
  ACTIVE = 'ACTIBE',
  INACTIVE = 'INACTIVE',
  INVITED = 'INVITED',
}
export const ERRORS = {
  INVALID_SESSION_TOKEN: {
    code: 401,
    message: 'Token Expired',
  },
  EXISTED_EMAIL: {
    code: 202,
    message: 'Account already exists for this username.',
  },
};

export enum MenuHeader {
  LOGOUT = 'LOGOUT',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
}

export enum MenuHeaderLabel {
  LOGOUT = 'Log out',
  CHANGE_PASSWORD = 'Change password',
}

export const GET_ACCESS_TOKEN_MINUTE_MS = 36000;
