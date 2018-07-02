// @flow
export default function log(logThis: string) {
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  process.env.NODE_ENV === 'development' && console.log(logThis);
}
