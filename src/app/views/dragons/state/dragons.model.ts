export interface Dragon {
  id: string;
  name: string;
  type: string;
  avatar: string;
  createdAt: string;
}

export interface DragonsState {
  dragons: Dragon[];
}

export interface DragonCreateInput {
  name: string;
  type: string;
  avatar?: string;
}
