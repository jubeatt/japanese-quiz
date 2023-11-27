import { CORRECT, JAPANESE } from '../constants.js'
import { RenderService } from './RenderService.js'

export class EventService {
  constructor(quiz_service, render_service) {
    this.quiz_service = quiz_service
    this.render_service = render_service
  }

  handle_select_mode(mode) {
    this.quiz_service.set_mode(mode)
    const question = this.quiz_service.get_question()
    this.render_service.show_question_card(RenderService.QuestionCard(question), 0)
  }

  handle_card_flip(element) {
    element.classList.toggle('flipped')
  }

  handle_action(action, prev_question) {
    const [question, answer] = prev_question.split('|')
    const [japanese, rome] = this.quiz_service.get_mode() === JAPANESE ? [question, answer] : [answer, question]

    if (action === CORRECT) {
      this.quiz_service.set_correct_history(japanese, rome)
    } else {
      this.quiz_service.set_wrong_history(japanese, rome)
    }

    const next_question = this.quiz_service.get_question()
    this.render_service.show_question_card(RenderService.QuestionCard(next_question), 0)
  }

  handle_finish() {
    const correct_list = Object.entries(this.quiz_service.get_correct_history()).map(([key, value]) => {
      return {
        japanese: key,
        rome: value.rome,
        count: value.count
      }
    })
    const wrong_list = Object.entries(this.quiz_service.get_wrong_history()).map(([key, value]) => {
      return {
        japanese: key,
        rome: value.rome,
        count: value.count
      }
    })

    this.render_service.show_result({
      correct_list: _.sortBy(correct_list, ['count']).reverse(),
      wrong_list: _.sortBy(wrong_list, ['count']).reverse()
    })
  }

  handle_retry() {
    this.quiz_service.initialize()
    this.render_service.show_home_page()
  }
}
