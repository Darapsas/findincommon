import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import ConversationInput from './conversation-input'

describe('<ConversationInput />', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<ConversationInput />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
