export interface User {
  login: string
  password: string
}

export interface Category {
  name: string
  imageSrc?: string
  user?: string
  _id?: string
}

export interface Fixture {
  id_fixture: number
  price: number
  dateedit: Date
  useredit: string
}

export interface FilterFixture {
  id_geograph: number
  id_owner: number
  id_fixture_type: number
  id_substation: number
  id_mode: number
}
