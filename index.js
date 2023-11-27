import { DATA, FINISH } from './constants.js'
import { QuizService } from './services/QuizService.js'
import { RenderService } from './services/RenderService.js'
import { EventService } from './services/EventService.js'

const root_element = document.getElementById('root')
const quiz_service = new QuizService(DATA)
const render_service = new RenderService(root_element)
const event_service = new EventService(quiz_service, render_service)
const throttle_card_flip = _.throttle(event_service.handle_card_flip, 500)

quiz_service.initialize()
render_service.show_home_page()

root_element.addEventListener('click', (event) => {
  if (event.target.getAttribute('data-mode')) {
    event_service.handle_select_mode(event.target.getAttribute('data-mode'))
    return
  }

  if (event.target.closest('.card')) {
    throttle_card_flip(event.target.closest('.card'))
    return
  }

  if (event.target.getAttribute('data-action') === FINISH) {
    event_service.handle_finish()
    return
  }

  if (event.target.getAttribute('data-action') && event.target.getAttribute('data-question-data')) {
    event_service.handle_action(
      event.target.getAttribute('data-action'),
      event.target.getAttribute('data-question-data')
    )
    return
  }

  if (event.target.getAttribute('data-retry')) {
    event_service.handle_retry()
    return
  }
})
