import { GroupBet } from './GroupBet';
import { HistoryUserFootballBet } from '../models';

export interface UserFootballBetInfo{
    userBet:HistoryUserFootballBet[];
    footballBet:GroupBet;
    ended:Boolean;
}