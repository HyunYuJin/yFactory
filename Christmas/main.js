import './styles/style.scss'
import Snow from './js/snow/Snow'
import Record from './js/record/Record'

const canvas = document.getElementById('snow')
const snowOptions = {
  color: '#FFF',
  radius: [0.5, 3.0],
  speed: [1, 3],
  wind: [-0.5, 3.0]
}

new Snow(canvas, 500, snowOptions)

const element = document.getElementById('record')
const recordOptions = {
  width: '330px',
  height: '190px',
  color: '#D52F31',
  radius: '8px'
}

new Record(element, recordOptions)