import {Pane, Text} from "evergreen-ui"
import React from "react"

function Footer () {
    return (
        <Pane background="gray400" height={50} width='100%' is='footer'>
            <Text>This is a custom footer</Text>
        </Pane>
    )
}

export default Footer
