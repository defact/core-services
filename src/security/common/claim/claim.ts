export enum Entity {
  User = 'user',
  Group = 'group',
  Profile = 'profile',
}

export enum Right {
  Nothing = 0,
  Create = 1,
  Read = 2,
  Update = 4,
  Destroy = 8,
}

export enum Permission {
  None = Right.Nothing,
  ReadOnly = Right.Read,
  Editor = Right.Read | Right.Update,
  FullAccess = Right.Read | Right.Update | Right.Create | Right.Destroy,
}

export interface Claim { entity: Entity; right: Right; }
