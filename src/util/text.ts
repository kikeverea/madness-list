type ArgsProps = {
  capitalize: boolean
}

export const capitalize = (str: string): string =>
  `${str[0].toUpperCase()}${str.substring(1).toLowerCase()}`

export const humanize = (str: string, args?: ArgsProps): string => {
  const humanized = str.replace(/[^a-zA-Z0-9]/g, ' ').trim()

  return args?.capitalize
    ? capitalize(humanized)
    : humanized.toLowerCase()
}

