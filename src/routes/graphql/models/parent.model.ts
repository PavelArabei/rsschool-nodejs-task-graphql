export interface UUID {
  id: string;
}

export type MemberId = 'basic' | 'business';
export interface MemberArg {
  id: MemberId;
}
export interface USER {
  id: string;
  name: string;
  balance: number;
}

export interface PROFILE {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
}

export interface MEMBER {
  id: string;
  discount: number;
  postsLimitPerMonth: number;
}

export interface POST {
  id: string;
  title: string;
  content: string;
  authorId: string;
}
