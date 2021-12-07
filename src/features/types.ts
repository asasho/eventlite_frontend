export interface PROPS_NEWEVENT {
  title: string
  start_datetime: Date | null
  location: string
}

export interface PROPS_UPDATEEVENT {
  id: number
  title: string
  start_datetime: Date | null
  location: string
}

export interface PROPS_DELETEEVENT {
  id: number
  title: string
  start_datetime: Date | null
  location: string
}

export interface PROPS_AUTH {
  email: string
  password: string
}

export interface PROPS_REGISTER {
  email: string
  password: string
  password_confirmation: string
}
