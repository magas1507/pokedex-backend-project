export interface PokemonResumo {
  id: number;
  name: string;
  type: string[];
  height: number;
  weight: number;
  hp: number;
  attack: number;
  defense: number;
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
}