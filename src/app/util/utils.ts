export default class Utils {
  private static debugOn = false;

  static BACKEND_HOST = 'http://localhost:4545';

  static CONFIGS_API = {
    ENDPOINT: Utils.BACKEND_HOST + '/configs'
  };

  static OAUTH_API = {
    ENDPOINT: Utils.BACKEND_HOST + '/tokens'
  };

  /** JSONAta Utils */
  static JSONATA_EXP = {
    GET_ENDPOINTS: [
      '(',
      '$isEmpty := function($arr) { $count($arr) = 0 };',
      '$allGET := $map(settings, function($v, $i) {(',
      '{',
      '\'name\': $v.key,',
      '\'path\': $v.pathPattern,',
      '\'emptyParams\': $isEmpty($v.httpOperations[method = \'GET\'].parameters),',
      '\'url\': $v.httpOperations[method = \'GET\'].url',
      '}[emptyParams and url];',
      ')});',
      '$batchRequests := $map($allGET, function($v, $i) {(',
      '{',
      '\'id\': $formatNumber($random() * 1000, \'000\'),',
      '\'method\': \'GET\',',
      '\'url\': $v.path',
      '}',
      ')});',
      '{',
      '\'allGET\' : $allGET,',
      '\'batchRequests\': $batchRequests',
      '}',
      ')'
    ].join(''),
    FILTER_SETTING_VALUES: [
      '(',
      '$results := $map(responses, function($v, $i) {(',
      '{',
      '\'id\': $v.id,',
      '\'name\': $replace($v.url, \'/\', \'\'),',
      '\'url\': $v.url,',
      '\'body\': $v.response.body',
      '}',
      ')})[body];',
      '$sortedResults := $sort($results, function($l, $r) {(',
      '$number($l.id) > $number($r.id)',
      ')});',
      ')'
    ].join('')
  };

  /** Console utils */
  private static CONSOLE_COLORS = {
    Reset: '\x1b[0m',
    Bright: '\x1b[1m',
    Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',

    FgBlack: '\x1b[30m',
    FgRed: '\x1b[31m',
    FgGreen: '\x1b[32m',
    FgYellow: '\x1b[33m',
    FgBlue: '\x1b[34m',
    FgMagenta: '\x1b[35m',
    FgCyan: '\x1b[36m',
    FgWhite: '\x1b[37m',

    BgBlack: '\x1b[40m',
    BgRed: '\x1b[41m',
    BgGreen: '\x1b[42m',
    BgYellow: '\x1b[43m',
    BgBlue: '\x1b[44m',
    BgMagenta: '\x1b[45m',
    BgCyan: '\x1b[46m',
    BgWhite: '\x1b[47m'
  };

  static setDebug = (enable = false) => (Utils.debugOn = enable);

  private static logIt = (c, simbol, msg, stringify = false) =>
    console.log(
      c + '%s %s' + Utils.CONSOLE_COLORS.Reset,
      simbol,
      stringify ? JSON.stringify(msg, null, 2) : msg
    )

  static error = (msg, stringify = false) =>
    Utils.logIt(Utils.CONSOLE_COLORS.FgRed, '(X)', msg, stringify)

  static info = (msg, stringify = false) =>
    Utils.logIt(Utils.CONSOLE_COLORS.FgGreen, '(i)', msg, stringify)

  static warn = (msg, stringify = false) =>
    Utils.logIt(Utils.CONSOLE_COLORS.FgYellow, '(!)', msg, stringify)

  static highlight = (msg = '--------------------', stringify = false) =>
    Utils.logIt(Utils.CONSOLE_COLORS.FgCyan, '(*)', stringify ? msg : '------' + msg + '------', stringify)

  static debug = (msg, stringify = false) => {
    if (Utils.debugOn) {
      console.log(
        Utils.CONSOLE_COLORS.FgMagenta + '%s %s' + Utils.CONSOLE_COLORS.Reset,
        '(>)',
        msg
      );
    }
  }
  /** Object utils */
  static isEmpty = val => {
    const typeOfVal = typeof val;
    switch (typeOfVal) {
      case 'object':
        return val.length === 0 || !Object.keys(val).length;
      case 'string':
        const str = val.trim();
        return str === '' || str === undefined;
      case 'number':
        return val === '';
      default:
        return val === '' || val === undefined;
    }
  }

  static isEnoughToCompare = (arr = []) => arr.length > 1 && arr.length < 4;

  static extractBaseUrl = tokenUrl => new URL(tokenUrl).origin;

}
