import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import ConversationInAction from './conversation-in-action'

describe('<ConversationInAction />', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<ConversationInAction />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
