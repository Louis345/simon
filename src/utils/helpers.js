export const playButtonSound = (playButtonSound, computerSound, callback) => {
  //this handles the clicks by the player. Generates sound.
  if (playButtonSound) {
    let audio = new Audio(playButtonSound);
    audio.play();
  } else {
    //computer generated sound
    switch (computerSound) {
      case "green": {
        let audio = new Audio(
          "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
        );
        audio.play();
        break;
      }
      case "red": {
        let audio = new Audio(
          "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
        );
        audio.play();
        break;
      }
      case "yellow": {
        let audio = new Audio(
          "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
        );
        audio.play();
        break;
      }
      case "blue": {
        let audio = new Audio(
          "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
        );
        audio.play();
        break;
      }
    }
  }
};
export const shuffle = array => {
  var i = 0,
    j = 0,
    temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
