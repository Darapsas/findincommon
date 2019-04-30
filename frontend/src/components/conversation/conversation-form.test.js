import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import ConversationForm from './conversation-form'

describe('<ConversationForm />', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<ConversationForm />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
