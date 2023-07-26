const phonemesMap = {
  a: 'aa',
  b: 'PP',
  c: 'E',
  d: 'DD',
  e: 'E',
  f: 'FF',
  g: 'kk',
  h: 'CH',
  i: 'I',
  j: 'CH',
  k: 'kk',
  l: 'nn',
  m: 'PP',
  n: 'nn',
  o: 'O',
  p: 'PP',
  q: 'U',
  r: 'aa',
  s: 'kk',
  t: 'DD',
  u: 'U',
  v: 'FF',
  w: 'FF',
  x: 'nn',
  y: 'I',
  z: 'SS',
};

export const phonemesGenerator = (transcript) => {
  const words = transcript.split(' ');
  const phonemes = [];

  for (const word of words) {
    const wordPhonemes = [];
    for (const character of word) {
      const phoneme = phonemesMap[character];
      if (phoneme) {
        wordPhonemes.push(phoneme);
      }
    }
    phonemes.push(wordPhonemes);
  }
  //   console.log(phonemes);
  return phonemes;
};
