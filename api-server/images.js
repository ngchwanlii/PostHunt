let db = {};

const avatarOption = {
  topType: [
    'NoHair',
    'Eyepatch',
    'Hat',
    'Hijab',
    'Turban',
    'WinterHat1',
    'WinterHat2',
    'WinterHat3',
    'WinterHat4',
    'LongHairBigHair',
    'LongHairBob',
    'LongHairBun',
    'LongHairCurly',
    'LongHairCurvy',
    'LongHairDreads',
    'LongHairFrida',
    'LongHairFro',
    'LongHairFroBand',
    'LongHairNotTooLong',
    'LongHairShavedSides',
    'LongHairStraight',
    'LongHairStraight2',
    'LongHairStraightStrand',
    'ShortHairDreads01',
    'ShortHairDreads02',
    'ShortHairFrizzle',
    'ShortHairShaggyMullet',
    'ShortHairShortCurly',
    'ShortHairShortFlat',
    'ShortHairShortRound',
    'ShortHairShortWaved',
    'ShortHairSides',
    'ShortHairTheCaesar',
    'ShortHairTheCaesarSidePart',
  ],
  accessoriesType: [
    'Blank',
    'Kurt',
    'Prescription01',
    'Prescription02',
    'Round',
    'Sunglasses',
    'Wayfarers',
  ],
  hairColor: [
    'Auburn',
    'Black',
    'Blonde',
    'BlondeGolden',
    'Brown',
    'BrownDark',
    'PastelPink',
    'Platinum',
    'Red',
    'SilverGray',
  ],
  facialHairType: [
    'Blank',
    'BeardMedium',
    'BeardLight',
    'BeardMagestic',
    'MoustacheFancy',
    'MoustacheMagnum',
  ],
  clotheType: [
    'BlazerShirt',
    'BlazerSweater',
    'CollarSweater',
    'GraphicShirt',
    'Hoodie',
    'Overall',
    'ShirtCrewNeck',
    'ShirtScoopNeck',
    'ShirtVNeck',
  ],
  eyeType: [
    'Close',
    'Cry',
    'Default',
    'Dizzy',
    'EyeRoll',
    'Happy',
    'Hearts',
    'Side',
    'Squint',
    'Surprised',
    'Wink',
    'WinkWacky',
  ],
  eyebrowType: [
    'Angry',
    'AngryNatural',
    'Default',
    'DefaultNatural',
    'FlatNatural',
    'RaisedExcited',
    'RaisedExcitedNatural',
    'SadConcerned',
    'SadConcernedNatural',
    'UnibrowNatural',
    'UpDown',
    'UpDownNatural',
  ],
  mouthType: [
    'Concerned',
    'Default',
    'Disbelief',
    'Eating',
    'Grimace',
    'Sad',
    'ScreamOpen',
    'Serious',
    'Smile',
    'Tongue',
    'Twinkle',
    'Vomit',
  ],
  skinColor: [
    'Tanned',
    'Yellow',
    'Pale',
    'Light',
    'Brown',
    'DarkBrown',
    'Black',
  ],
};

function randomize(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getAvatar() {
  return `https://avataaars.io/?avatarStyle=Circle&topType=${randomize(
    avatarOption.topType,
  )}&accessoriesType=${randomize(
    avatarOption.accessoriesType,
  )}&hairColor=${randomize(avatarOption.hairColor)}&facialHairType=${randomize(
    avatarOption.facialHairType,
  )}&clotheType=${randomize(avatarOption.clotheType)}&eyeType=${randomize(
    avatarOption.eyeType,
  )}&eyebrowType=${randomize(avatarOption.eyebrowType)}&mouthType=${randomize(
    avatarOption.mouthType,
  )}&skinColor=${randomize(avatarOption.skinColor)}}`;
}

function getPostCover(username) {
  let data = db[username];
  if (data == null || !data.cover) {
    data = db[username] = {
      ...data,
      cover: `https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png`,
    };
  }
  return data.cover;
}

function getProfileAvatar(username) {
  let data = db[username];
  if (data == null || !data.avatar) {
    data = db[username] = { ...data, avatar: getAvatar() };
  }
  return data.avatar;
}

module.exports = {
  getProfileAvatar,
  getPostCover,
};
