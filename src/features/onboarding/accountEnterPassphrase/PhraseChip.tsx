/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, memo } from 'react'
import { upperFirst } from 'lodash'
import Text from '../../../components/Text'
import TouchableHighlightBox, {
  TouchableHighlightBoxProps,
} from '../../../components/TouchableHighlightBox'
import { useColors } from '../../../theme/themeHooks'
import CheckMark from '../../../assets/images/checkmark.svg'
import Fail from '../../../assets/images/fail.svg'
import Box from '../../../components/Box'
import { Colors } from '../../../theme/theme'

type Props = Omit<TouchableHighlightBoxProps, 'children'> & {
  title: string
  selected?: boolean
  fail: boolean
  success: boolean
}

const PhraseChip = ({
  title,
  selected,
  fail,
  success,
  disabled,
  ...props
}: Props) => {
  const { primary } = useColors()
  const [underlayShowing, setUnderlayShowing] = useState(false)

  const getBackgroundColor = (): Colors => {
    if (selected) return 'primary'
    if (fail) return 'error'
    return 'secondaryBackground'
  }

  const getIcon = () => {
    if (success) return <CheckMark color="white" />

    if (fail) return <Fail />

    return null
  }

  return (
    <TouchableHighlightBox
      backgroundColor={getBackgroundColor()}
      borderRadius="l"
      paddingVertical="m"
      maxWidth="30%"
      justifyContent="center"
      underlayColor={primary}
      disabled={selected || disabled}
      onHideUnderlay={() => setUnderlayShowing(false)}
      onShowUnderlay={() => setUnderlayShowing(true)}
      {...props}
    >
      <>
        <Box
          position="absolute"
          justifyContent="center"
          alignItems="center"
          top={0}
          left={0}
          right={0}
          bottom={0}
        >
          {getIcon()}
        </Box>
        <Text
          paddingHorizontal="m"
          numberOfLines={1}
          adjustsFontSizeToFit
          opacity={fail || success ? 0 : 1}
          variant="body1"
          color={selected || underlayShowing ? 'white' : 'primaryText'}
        >
          {upperFirst(title)}
        </Text>
      </>
    </TouchableHighlightBox>
  )
}

export default memo(PhraseChip)
