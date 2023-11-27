import { JAPANESE } from '../constants.js'

export class QuizService {
  mode = null
  count = 0
  correct_history = new Object()
  wrong_history = new Object()

  constructor(data) {
    this.quiz_data = data
    this.total = _.values(data).length - 1
  }

  get_question() {
    this.count++
    const random = _.random(0, this.total)
    const [key, value] = _.entries(this.quiz_data)[random]
    const data = {
      question: this.mode === JAPANESE ? value : key,
      answer: this.mode === JAPANESE ? key : value,
      count: this.count
    }

    return data
  }

  get_mode() {
    return this.mode
  }

  set_mode(mode) {
    this.mode = mode
  }

  set_correct_history(japanese, rome) {
    if (this.correct_history[japanese]) {
      this.correct_history[japanese].count = this.correct_history[japanese].count + 1
      return
    }

    this.correct_history[japanese] = {
      count: 1,
      rome
    }
  }

  set_wrong_history(japanese, rome) {
    if (this.wrong_history[japanese]) {
      this.wrong_history[japanese].count = this.wrong_history[japanese].count + 1
      return
    }

    this.wrong_history[japanese] = {
      count: 1,
      rome
    }
  }

  get_correct_history() {
    return this.correct_history
  }

  get_wrong_history() {
    return this.wrong_history
  }

  initialize() {
    this.mode = null
    this.correct_history = new Object()
    this.wrong_history = new Object()
    this.count = 0
  }
}
