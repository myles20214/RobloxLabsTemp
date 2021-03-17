import { _dirname } from '../../Constants/Directories';
import filestream from 'fs';

export const CheckIfPlaceExists = (placeId: number): boolean => {
	const placePath = _dirname + '\\DataBase\\places\\' + placeId;
	if (!filestream.existsSync(placePath)) {
		return false;
	}
	return true;
};
