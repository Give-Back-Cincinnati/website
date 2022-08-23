import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TextArea } from './TextArea'

const story = {
    title: 'Inputs/TextArea',
    component: TextArea,
    args: {
        value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed condimentum magna. Curabitur elementum in tellus a laoreet. Maecenas iaculis tristique vestibulum. Nulla eget arcu ut ligula venenatis pharetra sit amet in augue. Ut molestie ut orci in laoreet. Nulla lobortis, mauris sit amet dignissim tempor, neque ex faucibus augue, a mollis nulla nisi non lectus. Phasellus placerat ut odio ut sagittis. Donec sem ipsum, scelerisque eget tellus scelerisque, fermentum laoreet nisi. Proin justo sapien, sagittis sit amet posuere at, ultricies nec tellus. Aliquam erat volutpat.

        Curabitur hendrerit nisi eu eros placerat tempor eu sit amet leo. Phasellus sollicitudin odio interdum metus aliquet, quis ornare augue rutrum. In vitae est imperdiet lorem iaculis gravida eget sit amet metus. Fusce mollis diam nec lectus aliquam, nec lobortis dui consequat. Quisque scelerisque ipsum et diam efficitur, sit amet laoreet quam aliquam. Cras sed imperdiet ipsum. Pellentesque placerat elit risus, id gravida sapien posuere at. Mauris tempor tincidunt nulla, eget pretium risus faucibus egestas. Aliquam mi leo, tempor sit amet ligula eu, venenatis feugiat turpis. Mauris ut viverra erat, at tincidunt mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis in nibh eu mi ornare aliquet non sed massa. Ut id placerat magna.`
    },
    argTypes: {
        onChange: { action: 'onChange' }
    }
} as ComponentMeta<typeof TextArea>

export default story

const Template: ComponentStory<typeof TextArea> = (args) => {
    const [ value, setValue ] = useState(args.value)

    args.onChange = (e) => setValue(e.target.value)
    args.value = value
    return <TextArea {...args} />
}

export const Primary = Template.bind({})
Primary.args = {
    name: 'description',
    label: 'Description',
    required: true,
    error: false
}

export const FullWidth = Template.bind({})
FullWidth.args = {
    ...Primary.args,
    fullWidth: true
}