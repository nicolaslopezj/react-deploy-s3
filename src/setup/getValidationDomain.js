export default function (domain) {
  const parts = domain.split('.')
  const last = parts.length - 1
  return parts[last - 1] + '.' + parts[last]
}
