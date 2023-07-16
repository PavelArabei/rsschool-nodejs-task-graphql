export interface ID {
  id: string;
}

export type MemberId = 'basic' | 'business';
export interface MemberArg {
  id: MemberId;
}
