import {Message} from "protobufjs";

export type PlayerMap = { [key: string]: GamePlayer };

export type CardPackMap = { [packId: string]: { [cardIndex: number]: CardId } };

export interface IPlayer
{
	guid: string;
	secret: string;
}

export interface GamePlayer
{
	guid: string;
	nickname: string;
	wins: number;
	whiteCards: CardId[];
	isSpectating: boolean;
	isRandom: boolean;
}

export interface CardId
{
	packId: string;
	cardIndex: number;
}

export interface IGameSettings
{
	public: boolean;
	hideDuringReveal: boolean;
	skipReveal: boolean;
	playerLimit: number;
	password: string | null;
	roundsToWin: number;
	inviteLink: string | null;
	includedPacks: string[];
	includedCardcastPacks: string[];
	winnerBecomesCzar: boolean;
	customWhites: boolean;
}

export interface GameItem
{
	id: string;
	roundIndex: number;
	roundStarted: boolean;
	ownerGuid: string;
	chooserGuid: string | null;
	started: boolean;
	dateCreated: Date;
	dateUpdated: Date;
	players: PlayerMap;
	spectators: PlayerMap;
	pendingPlayers: PlayerMap;
	kickedPlayers: PlayerMap;
	blackCard: CardId;
	// key = player guid, value = white card ID
	roundCards: { [playerGuid: string]: CardId[] };
	roundCardsCustom: { [playerGuid: string]: string[] } | undefined;
	playerOrder: string[];
	usedBlackCards: CardPackMap;
	usedWhiteCards: CardPackMap;
	revealIndex: number;
	lastWinner: GamePlayer | undefined;
	settings: IGameSettings;
}

export interface GamePayload extends Partial<GameItem>
{
	buildVersion: number;
}

export interface ICardTypes
{
	types: ICardType[];
}

export type CardTypeId = "official" | "thirdparty";

export interface ICardType
{
	id: CardTypeId;
	name: string;
	packs: string[];
	quantity: number;
}

export interface ICardPackQuantity
{
	black: number;
	white: number;
	total: number;
}

export interface ICardPackTypeDefinition
{
	packs: ICardPackSummary[];
}

export interface ICardPackSummary
{
	name: string;
	packId: string;
	isOfficial: boolean;
	quantity: ICardPackQuantity;
}

export interface ICardPackDefinition
{
	pack: {
		name: string;
		id: string;
	};
	quantity: ICardPackQuantity;
	black: IBlackCardDefinition[];
	white: string[];
	dateStoredMs?: number;
}

export interface IBlackCardDefinition
{
	content: string;
	pick: number;
	draw: number;
}