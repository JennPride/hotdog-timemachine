type StringToNumberRecord = {
    [key: string]: number;
  };

export enum EVENTS_NAME {
    smLoot = 'small-loot',
    medLoot = 'medium-loot',
    lgLoot = 'large-loot',
    xlgLoot = 'xlarge-loot',
    gameEnd = 'game-end'
}

export const SPEED_MAP: StringToNumberRecord = {
    'silentdisco': 4,
    'hotchocolate': 2,
    'ice': -0.75
}

export enum GAME_STATUS {
    WIN,
    LOSE,
  }