import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import ScrollUp from './scroll-up'

global.scrollTo = jest.fn()

describe('<ScrollUp />', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<ScrollUp />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('contains a button', () => {
    const wrapper = shallow(<ScrollUp />)
    expect(wrapper.find('button').exists()).toBeTruthy()
  })
  it('button scrolls the page to the top position', () => {
    const wrapper = shallow(<ScrollUp />)
    const scrollUpButton = wrapper.find('button')
    scrollUpButton.simulate('click')
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0)
  })
})
