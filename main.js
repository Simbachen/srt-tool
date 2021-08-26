const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const path = require('path')
const RequestApi = require('./weblfasr-node.js')
const config = require('./config.js');
const objToSrt = require('./objToSrt.js');
async function run(options) {       
  if (!options.input) {
    console.error('Please input the video path')
    return
  }
  const videoPath = path.join(process.cwd(), options.input)
  try {
    const audioPath = await exractSoundToMP3(videoPath)
      
    let ra = new RequestApi(Object.assign({}, config, {
      filePath: audioPath
    }))
    const data = await ra.allApiRequest()
    const extname = path.extname(videoPath)
    const srtPath = videoPath.replace(extname, '.srt')
    objToSrt(data, srtPath)
  } catch (e) {
    console.log(e)
  }
    
}

function exractSoundToMP3(videoPath) {
  return new Promise((resolve, reject) => {
    const extname = path.extname(videoPath)
    const dest = videoPath.replace(extname, '.mp3')
    const spawn = require('child_process').spawn;
    try{
      const _ffmpeg = spawn(ffmpeg.path, ['-i', 
        videoPath, 
        '-vn',
        '-ar',
        44100,
        '-ac',
        2,
        '-ab',
        192000,
        '-f',
        'mp3',
        dest,
        '-y']);
      _ffmpeg.on('exit', () => {
        resolve(dest)
      });
      _ffmpeg.stderr.on('data', (data) => {
        console.log(data.toString('utf8'))
      })
    }catch(e) {
      console.log(e)
      reject()
    }
  })
          
}


module.exports = run
