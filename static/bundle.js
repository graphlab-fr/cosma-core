(() => {
  var t = {
      490: () => {
        var t = document.getElementById('citation-references'),
          n = t.querySelector('button'),
          e = t.querySelector('code');
        n.addEventListener('click', function () {
          var t = document.createElement('a');
          t.setAttribute(
            'href',
            'data:text/plain;charset=utf-8,' + encodeURIComponent(e.textContent)
          ),
            t.setAttribute('download', 'bibliography.json'),
            (t.style.display = 'none'),
            document.body.appendChild(t),
            t.click(),
            t.remove();
        });
      },
      691: function (t) {
        t.exports = (function () {
          'use strict';
          function t(t, n) {
            var e = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
              var r = Object.getOwnPropertySymbols(t);
              n &&
                (r = r.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(t, n).enumerable;
                })),
                e.push.apply(e, r);
            }
            return e;
          }
          function n(n) {
            for (var e = 1; e < arguments.length; e++) {
              var r = null != arguments[e] ? arguments[e] : {};
              e % 2
                ? t(Object(r), !0).forEach(function (t) {
                    a(n, t, r[t]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(r))
                : t(Object(r)).forEach(function (t) {
                    Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(r, t));
                  });
            }
            return n;
          }
          function e(t) {
            return (
              (e =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                  ? function (t) {
                      return typeof t;
                    }
                  : function (t) {
                      return t &&
                        'function' == typeof Symbol &&
                        t.constructor === Symbol &&
                        t !== Symbol.prototype
                        ? 'symbol'
                        : typeof t;
                    }),
              e(t)
            );
          }
          function r(t, n) {
            if (!(t instanceof n)) throw new TypeError('Cannot call a class as a function');
          }
          function i(t, n) {
            for (var e = 0; e < n.length; e++) {
              var r = n[e];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r);
            }
          }
          function o(t, n, e) {
            return (
              n && i(t.prototype, n),
              e && i(t, e),
              Object.defineProperty(t, 'prototype', { writable: !1 }),
              t
            );
          }
          function a(t, n, e) {
            return (
              n in t
                ? Object.defineProperty(t, n, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (t[n] = e),
              t
            );
          }
          function u(t) {
            return (
              (function (t) {
                if (Array.isArray(t)) return s(t);
              })(t) ||
              (function (t) {
                if (
                  ('undefined' != typeof Symbol && null != t[Symbol.iterator]) ||
                  null != t['@@iterator']
                )
                  return Array.from(t);
              })(t) ||
              (function (t, n) {
                if (t) {
                  if ('string' == typeof t) return s(t, n);
                  var e = Object.prototype.toString.call(t).slice(8, -1);
                  return (
                    'Object' === e && t.constructor && (e = t.constructor.name),
                    'Map' === e || 'Set' === e
                      ? Array.from(t)
                      : 'Arguments' === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)
                      ? s(t, n)
                      : void 0
                  );
                }
              })(t) ||
              (function () {
                throw new TypeError(
                  'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                );
              })()
            );
          }
          function s(t, n) {
            (null == n || n > t.length) && (n = t.length);
            for (var e = 0, r = new Array(n); e < n; e++) r[e] = t[e];
            return r;
          }
          function c(t) {
            return Array.isArray ? Array.isArray(t) : '[object Array]' === _(t);
          }
          function f(t) {
            return 'string' == typeof t;
          }
          function h(t) {
            return 'number' == typeof t;
          }
          function l(t) {
            return (
              !0 === t ||
              !1 === t ||
              ((function (t) {
                return d(t) && null !== t;
              })(t) &&
                '[object Boolean]' == _(t))
            );
          }
          function d(t) {
            return 'object' === e(t);
          }
          function p(t) {
            return null != t;
          }
          function v(t) {
            return !t.trim().length;
          }
          function _(t) {
            return null == t
              ? void 0 === t
                ? '[object Undefined]'
                : '[object Null]'
              : Object.prototype.toString.call(t);
          }
          var y = 'Extended search is not available',
            g = function (t) {
              return 'Invalid value for key '.concat(t);
            },
            m = function (t) {
              return 'Pattern length exceeds max of '.concat(t, '.');
            },
            b = Object.prototype.hasOwnProperty,
            w = (function () {
              function t(n) {
                var e = this;
                r(this, t), (this._keys = []), (this._keyMap = {});
                var i = 0;
                n.forEach(function (t) {
                  var n = x(t);
                  (i += n.weight), e._keys.push(n), (e._keyMap[n.id] = n), (i += n.weight);
                }),
                  this._keys.forEach(function (t) {
                    t.weight /= i;
                  });
              }
              return (
                o(t, [
                  {
                    key: 'get',
                    value: function (t) {
                      return this._keyMap[t];
                    },
                  },
                  {
                    key: 'keys',
                    value: function () {
                      return this._keys;
                    },
                  },
                  {
                    key: 'toJSON',
                    value: function () {
                      return JSON.stringify(this._keys);
                    },
                  },
                ]),
                t
              );
            })();
          function x(t) {
            var n = null,
              e = null,
              r = null,
              i = 1,
              o = null;
            if (f(t) || c(t)) (r = t), (n = M(t)), (e = k(t));
            else {
              if (!b.call(t, 'name'))
                throw new Error(
                  (function (t) {
                    return 'Missing '.concat(t, ' property in key');
                  })('name')
                );
              var a = t.name;
              if (((r = a), b.call(t, 'weight') && (i = t.weight) <= 0))
                throw new Error(
                  (function (t) {
                    return "Property 'weight' in key '".concat(t, "' must be a positive integer");
                  })(a)
                );
              (n = M(a)), (e = k(a)), (o = t.getFn);
            }
            return { path: n, id: e, weight: i, src: r, getFn: o };
          }
          function M(t) {
            return c(t) ? t : t.split('.');
          }
          function k(t) {
            return c(t) ? t.join('.') : t;
          }
          var N = {
              useExtendedSearch: !1,
              getFn: function (t, n) {
                var e = [],
                  r = !1;
                return (
                  (function t(n, i, o) {
                    if (p(n))
                      if (i[o]) {
                        var a = n[i[o]];
                        if (!p(a)) return;
                        if (o === i.length - 1 && (f(a) || h(a) || l(a)))
                          e.push(
                            (function (t) {
                              return null == t
                                ? ''
                                : (function (t) {
                                    if ('string' == typeof t) return t;
                                    var n = t + '';
                                    return '0' == n && 1 / t == -1 / 0 ? '-0' : n;
                                  })(t);
                            })(a)
                          );
                        else if (c(a)) {
                          r = !0;
                          for (var u = 0, s = a.length; u < s; u += 1) t(a[u], i, o + 1);
                        } else i.length && t(a, i, o + 1);
                      } else e.push(n);
                  })(t, f(n) ? n.split('.') : n, 0),
                  r ? e : e[0]
                );
              },
              ignoreLocation: !1,
              ignoreFieldNorm: !1,
              fieldNormWeight: 1,
            },
            A = n(
              n(
                n(
                  n(
                    {},
                    {
                      isCaseSensitive: !1,
                      includeScore: !1,
                      keys: [],
                      shouldSort: !0,
                      sortFn: function (t, n) {
                        return t.score === n.score
                          ? t.idx < n.idx
                            ? -1
                            : 1
                          : t.score < n.score
                          ? -1
                          : 1;
                      },
                    }
                  ),
                  { includeMatches: !1, findAllMatches: !1, minMatchCharLength: 1 }
                ),
                { location: 0, threshold: 0.6, distance: 100 }
              ),
              N
            ),
            T = /[^ ]+/g;
          function C() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
              n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3,
              e = new Map(),
              r = Math.pow(10, n);
            return {
              get: function (n) {
                var i = n.match(T).length;
                if (e.has(i)) return e.get(i);
                var o = 1 / Math.pow(i, 0.5 * t),
                  a = parseFloat(Math.round(o * r) / r);
                return e.set(i, a), a;
              },
              clear: function () {
                e.clear();
              },
            };
          }
          var S = (function () {
            function t() {
              var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                e = n.getFn,
                i = void 0 === e ? A.getFn : e,
                o = n.fieldNormWeight,
                a = void 0 === o ? A.fieldNormWeight : o;
              r(this, t),
                (this.norm = C(a, 3)),
                (this.getFn = i),
                (this.isCreated = !1),
                this.setIndexRecords();
            }
            return (
              o(t, [
                {
                  key: 'setSources',
                  value: function () {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                    this.docs = t;
                  },
                },
                {
                  key: 'setIndexRecords',
                  value: function () {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                    this.records = t;
                  },
                },
                {
                  key: 'setKeys',
                  value: function () {
                    var t = this,
                      n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                    (this.keys = n),
                      (this._keysMap = {}),
                      n.forEach(function (n, e) {
                        t._keysMap[n.id] = e;
                      });
                  },
                },
                {
                  key: 'create',
                  value: function () {
                    var t = this;
                    !this.isCreated &&
                      this.docs.length &&
                      ((this.isCreated = !0),
                      f(this.docs[0])
                        ? this.docs.forEach(function (n, e) {
                            t._addString(n, e);
                          })
                        : this.docs.forEach(function (n, e) {
                            t._addObject(n, e);
                          }),
                      this.norm.clear());
                  },
                },
                {
                  key: 'add',
                  value: function (t) {
                    var n = this.size();
                    f(t) ? this._addString(t, n) : this._addObject(t, n);
                  },
                },
                {
                  key: 'removeAt',
                  value: function (t) {
                    this.records.splice(t, 1);
                    for (var n = t, e = this.size(); n < e; n += 1) this.records[n].i -= 1;
                  },
                },
                {
                  key: 'getValueForItemAtKeyId',
                  value: function (t, n) {
                    return t[this._keysMap[n]];
                  },
                },
                {
                  key: 'size',
                  value: function () {
                    return this.records.length;
                  },
                },
                {
                  key: '_addString',
                  value: function (t, n) {
                    if (p(t) && !v(t)) {
                      var e = { v: t, i: n, n: this.norm.get(t) };
                      this.records.push(e);
                    }
                  },
                },
                {
                  key: '_addObject',
                  value: function (t, n) {
                    var e = this,
                      r = { i: n, $: {} };
                    this.keys.forEach(function (n, i) {
                      var o = n.getFn ? n.getFn(t) : e.getFn(t, n.path);
                      if (p(o))
                        if (c(o))
                          !(function () {
                            for (var t = [], n = [{ nestedArrIndex: -1, value: o }]; n.length; ) {
                              var a = n.pop(),
                                u = a.nestedArrIndex,
                                s = a.value;
                              if (p(s))
                                if (f(s) && !v(s)) {
                                  var h = { v: s, i: u, n: e.norm.get(s) };
                                  t.push(h);
                                } else
                                  c(s) &&
                                    s.forEach(function (t, e) {
                                      n.push({ nestedArrIndex: e, value: t });
                                    });
                            }
                            r.$[i] = t;
                          })();
                        else if (f(o) && !v(o)) {
                          var a = { v: o, n: e.norm.get(o) };
                          r.$[i] = a;
                        }
                    }),
                      this.records.push(r);
                  },
                },
                {
                  key: 'toJSON',
                  value: function () {
                    return { keys: this.keys, records: this.records };
                  },
                },
              ]),
              t
            );
          })();
          function E(t, n) {
            var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
              r = e.getFn,
              i = void 0 === r ? A.getFn : r,
              o = e.fieldNormWeight,
              a = void 0 === o ? A.fieldNormWeight : o,
              u = new S({ getFn: i, fieldNormWeight: a });
            return u.setKeys(t.map(x)), u.setSources(n), u.create(), u;
          }
          function L(t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              e = n.errors,
              r = void 0 === e ? 0 : e,
              i = n.currentLocation,
              o = void 0 === i ? 0 : i,
              a = n.expectedLocation,
              u = void 0 === a ? 0 : a,
              s = n.distance,
              c = void 0 === s ? A.distance : s,
              f = n.ignoreLocation,
              h = void 0 === f ? A.ignoreLocation : f,
              l = r / t.length;
            if (h) return l;
            var d = Math.abs(u - o);
            return c ? l + d / c : d ? 1 : l;
          }
          function z() {
            for (
              var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : A.minMatchCharLength,
                e = [],
                r = -1,
                i = -1,
                o = 0,
                a = t.length;
              o < a;
              o += 1
            ) {
              var u = t[o];
              u && -1 === r
                ? (r = o)
                : u || -1 === r || ((i = o - 1) - r + 1 >= n && e.push([r, i]), (r = -1));
            }
            return t[o - 1] && o - r >= n && e.push([r, o - 1]), e;
          }
          var U = 32;
          function P(t) {
            for (var n = {}, e = 0, r = t.length; e < r; e += 1) {
              var i = t.charAt(e);
              n[i] = (n[i] || 0) | (1 << (r - e - 1));
            }
            return n;
          }
          var I = (function () {
              function t(n) {
                var e = this,
                  i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                  o = i.location,
                  a = void 0 === o ? A.location : o,
                  u = i.threshold,
                  s = void 0 === u ? A.threshold : u,
                  c = i.distance,
                  f = void 0 === c ? A.distance : c,
                  h = i.includeMatches,
                  l = void 0 === h ? A.includeMatches : h,
                  d = i.findAllMatches,
                  p = void 0 === d ? A.findAllMatches : d,
                  v = i.minMatchCharLength,
                  _ = void 0 === v ? A.minMatchCharLength : v,
                  y = i.isCaseSensitive,
                  g = void 0 === y ? A.isCaseSensitive : y,
                  m = i.ignoreLocation,
                  b = void 0 === m ? A.ignoreLocation : m;
                if (
                  (r(this, t),
                  (this.options = {
                    location: a,
                    threshold: s,
                    distance: f,
                    includeMatches: l,
                    findAllMatches: p,
                    minMatchCharLength: _,
                    isCaseSensitive: g,
                    ignoreLocation: b,
                  }),
                  (this.pattern = g ? n : n.toLowerCase()),
                  (this.chunks = []),
                  this.pattern.length)
                ) {
                  var w = function (t, n) {
                      e.chunks.push({ pattern: t, alphabet: P(t), startIndex: n });
                    },
                    x = this.pattern.length;
                  if (x > U) {
                    for (var M = 0, k = x % U, N = x - k; M < N; )
                      w(this.pattern.substr(M, U), M), (M += U);
                    if (k) {
                      var T = x - U;
                      w(this.pattern.substr(T), T);
                    }
                  } else w(this.pattern, 0);
                }
              }
              return (
                o(t, [
                  {
                    key: 'searchIn',
                    value: function (t) {
                      var n = this.options,
                        e = n.isCaseSensitive,
                        r = n.includeMatches;
                      if ((e || (t = t.toLowerCase()), this.pattern === t)) {
                        var i = { isMatch: !0, score: 0 };
                        return r && (i.indices = [[0, t.length - 1]]), i;
                      }
                      var o = this.options,
                        a = o.location,
                        s = o.distance,
                        c = o.threshold,
                        f = o.findAllMatches,
                        h = o.minMatchCharLength,
                        l = o.ignoreLocation,
                        d = [],
                        p = 0,
                        v = !1;
                      this.chunks.forEach(function (n) {
                        var e = n.pattern,
                          i = n.alphabet,
                          o = n.startIndex,
                          _ = (function (t, n, e) {
                            var r =
                                arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                              i = r.location,
                              o = void 0 === i ? A.location : i,
                              a = r.distance,
                              u = void 0 === a ? A.distance : a,
                              s = r.threshold,
                              c = void 0 === s ? A.threshold : s,
                              f = r.findAllMatches,
                              h = void 0 === f ? A.findAllMatches : f,
                              l = r.minMatchCharLength,
                              d = void 0 === l ? A.minMatchCharLength : l,
                              p = r.includeMatches,
                              v = void 0 === p ? A.includeMatches : p,
                              _ = r.ignoreLocation,
                              y = void 0 === _ ? A.ignoreLocation : _;
                            if (n.length > U) throw new Error(m(U));
                            for (
                              var g,
                                b = n.length,
                                w = t.length,
                                x = Math.max(0, Math.min(o, w)),
                                M = c,
                                k = x,
                                N = d > 1 || v,
                                T = N ? Array(w) : [];
                              (g = t.indexOf(n, k)) > -1;

                            ) {
                              var C = L(n, {
                                currentLocation: g,
                                expectedLocation: x,
                                distance: u,
                                ignoreLocation: y,
                              });
                              if (((M = Math.min(C, M)), (k = g + b), N))
                                for (var S = 0; S < b; ) (T[g + S] = 1), (S += 1);
                            }
                            k = -1;
                            for (
                              var E = [], P = 1, I = b + w, D = 1 << (b - 1), j = 0;
                              j < b;
                              j += 1
                            ) {
                              for (var R = 0, O = I; R < O; )
                                L(n, {
                                  errors: j,
                                  currentLocation: x + O,
                                  expectedLocation: x,
                                  distance: u,
                                  ignoreLocation: y,
                                }) <= M
                                  ? (R = O)
                                  : (I = O),
                                  (O = Math.floor((I - R) / 2 + R));
                              I = O;
                              var q = Math.max(1, x - O + 1),
                                F = h ? w : Math.min(x + O, w) + b,
                                Y = Array(F + 2);
                              Y[F + 1] = (1 << j) - 1;
                              for (var H = F; H >= q; H -= 1) {
                                var X = H - 1,
                                  B = e[t.charAt(X)];
                                if (
                                  (N && (T[X] = +!!B),
                                  (Y[H] = ((Y[H + 1] << 1) | 1) & B),
                                  j && (Y[H] |= ((E[H + 1] | E[H]) << 1) | 1 | E[H + 1]),
                                  Y[H] & D &&
                                    (P = L(n, {
                                      errors: j,
                                      currentLocation: X,
                                      expectedLocation: x,
                                      distance: u,
                                      ignoreLocation: y,
                                    })) <= M)
                                ) {
                                  if (((M = P), (k = X) <= x)) break;
                                  q = Math.max(1, 2 * x - k);
                                }
                              }
                              if (
                                L(n, {
                                  errors: j + 1,
                                  currentLocation: x,
                                  expectedLocation: x,
                                  distance: u,
                                  ignoreLocation: y,
                                }) > M
                              )
                                break;
                              E = Y;
                            }
                            var $ = { isMatch: k >= 0, score: Math.max(0.001, P) };
                            if (N) {
                              var W = z(T, d);
                              W.length ? v && ($.indices = W) : ($.isMatch = !1);
                            }
                            return $;
                          })(t, e, i, {
                            location: a + o,
                            distance: s,
                            threshold: c,
                            findAllMatches: f,
                            minMatchCharLength: h,
                            includeMatches: r,
                            ignoreLocation: l,
                          }),
                          y = _.isMatch,
                          g = _.score,
                          b = _.indices;
                        y && (v = !0), (p += g), y && b && (d = [].concat(u(d), u(b)));
                      });
                      var _ = { isMatch: v, score: v ? p / this.chunks.length : 1 };
                      return v && r && (_.indices = d), _;
                    },
                  },
                ]),
                t
              );
            })(),
            D = [];
          function j(t, n) {
            for (var e = 0, r = D.length; e < r; e += 1) {
              var i = D[e];
              if (i.condition(t, n)) return new i(t, n);
            }
            return new I(t, n);
          }
          var R = '$and',
            O = '$or',
            q = '$path',
            F = '$val',
            Y = function (t) {
              return !(!t[R] && !t[O]);
            },
            H = function (t) {
              return !!t[q];
            },
            X = function (t) {
              return !c(t) && d(t) && !Y(t);
            },
            B = function (t) {
              return a(
                {},
                R,
                Object.keys(t).map(function (n) {
                  return a({}, n, t[n]);
                })
              );
            };
          function $(t, n) {
            var e = n.ignoreFieldNorm,
              r = void 0 === e ? A.ignoreFieldNorm : e;
            t.forEach(function (t) {
              var n = 1;
              t.matches.forEach(function (t) {
                var e = t.key,
                  i = t.norm,
                  o = t.score,
                  a = e ? e.weight : null;
                n *= Math.pow(0 === o && a ? Number.EPSILON : o, (a || 1) * (r ? 1 : i));
              }),
                (t.score = n);
            });
          }
          function W(t, n) {
            var e = t.matches;
            (n.matches = []),
              p(e) &&
                e.forEach(function (t) {
                  if (p(t.indices) && t.indices.length) {
                    var e = { indices: t.indices, value: t.value };
                    t.key && (e.key = t.key.src),
                      t.idx > -1 && (e.refIndex = t.idx),
                      n.matches.push(e);
                  }
                });
          }
          function V(t, n) {
            n.score = t.score;
          }
          function Z(t, n) {
            var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
              r = e.includeMatches,
              i = void 0 === r ? A.includeMatches : r,
              o = e.includeScore,
              a = void 0 === o ? A.includeScore : o,
              u = [];
            return (
              i && u.push(W),
              a && u.push(V),
              t.map(function (t) {
                var e = t.idx,
                  r = { item: n[e], refIndex: e };
                return (
                  u.length &&
                    u.forEach(function (n) {
                      n(t, r);
                    }),
                  r
                );
              })
            );
          }
          var J = (function () {
            function t(e) {
              var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                o = arguments.length > 2 ? arguments[2] : void 0;
              if ((r(this, t), (this.options = n(n({}, A), i)), this.options.useExtendedSearch))
                throw new Error(y);
              (this._keyStore = new w(this.options.keys)), this.setCollection(e, o);
            }
            return (
              o(t, [
                {
                  key: 'setCollection',
                  value: function (t, n) {
                    if (((this._docs = t), n && !(n instanceof S)))
                      throw new Error("Incorrect 'index' type");
                    this._myIndex =
                      n ||
                      E(this.options.keys, this._docs, {
                        getFn: this.options.getFn,
                        fieldNormWeight: this.options.fieldNormWeight,
                      });
                  },
                },
                {
                  key: 'add',
                  value: function (t) {
                    p(t) && (this._docs.push(t), this._myIndex.add(t));
                  },
                },
                {
                  key: 'remove',
                  value: function () {
                    for (
                      var t =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : function () {
                                return !1;
                              },
                        n = [],
                        e = 0,
                        r = this._docs.length;
                      e < r;
                      e += 1
                    ) {
                      var i = this._docs[e];
                      t(i, e) && (this.removeAt(e), (e -= 1), (r -= 1), n.push(i));
                    }
                    return n;
                  },
                },
                {
                  key: 'removeAt',
                  value: function (t) {
                    this._docs.splice(t, 1), this._myIndex.removeAt(t);
                  },
                },
                {
                  key: 'getIndex',
                  value: function () {
                    return this._myIndex;
                  },
                },
                {
                  key: 'search',
                  value: function (t) {
                    var n = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {})
                        .limit,
                      e = void 0 === n ? -1 : n,
                      r = this.options,
                      i = r.includeMatches,
                      o = r.includeScore,
                      a = r.shouldSort,
                      u = r.sortFn,
                      s = r.ignoreFieldNorm,
                      c = f(t)
                        ? f(this._docs[0])
                          ? this._searchStringList(t)
                          : this._searchObjectList(t)
                        : this._searchLogical(t);
                    return (
                      $(c, { ignoreFieldNorm: s }),
                      a && c.sort(u),
                      h(e) && e > -1 && (c = c.slice(0, e)),
                      Z(c, this._docs, { includeMatches: i, includeScore: o })
                    );
                  },
                },
                {
                  key: '_searchStringList',
                  value: function (t) {
                    var n = j(t, this.options),
                      e = this._myIndex.records,
                      r = [];
                    return (
                      e.forEach(function (t) {
                        var e = t.v,
                          i = t.i,
                          o = t.n;
                        if (p(e)) {
                          var a = n.searchIn(e),
                            u = a.isMatch,
                            s = a.score,
                            c = a.indices;
                          u &&
                            r.push({
                              item: e,
                              idx: i,
                              matches: [{ score: s, value: e, norm: o, indices: c }],
                            });
                        }
                      }),
                      r
                    );
                  },
                },
                {
                  key: '_searchLogical',
                  value: function (t) {
                    throw new Error('Logical search is not available');
                  },
                },
                {
                  key: '_searchObjectList',
                  value: function (t) {
                    var n = this,
                      e = j(t, this.options),
                      r = this._myIndex,
                      i = r.keys,
                      o = r.records,
                      a = [];
                    return (
                      o.forEach(function (t) {
                        var r = t.$,
                          o = t.i;
                        if (p(r)) {
                          var s = [];
                          i.forEach(function (t, i) {
                            s.push.apply(
                              s,
                              u(n._findMatches({ key: t, value: r[i], searcher: e }))
                            );
                          }),
                            s.length && a.push({ idx: o, item: r, matches: s });
                        }
                      }),
                      a
                    );
                  },
                },
                {
                  key: '_findMatches',
                  value: function (t) {
                    var n = t.key,
                      e = t.value,
                      r = t.searcher;
                    if (!p(e)) return [];
                    var i = [];
                    if (c(e))
                      e.forEach(function (t) {
                        var e = t.v,
                          o = t.i,
                          a = t.n;
                        if (p(e)) {
                          var u = r.searchIn(e),
                            s = u.isMatch,
                            c = u.score,
                            f = u.indices;
                          s && i.push({ score: c, key: n, value: e, idx: o, norm: a, indices: f });
                        }
                      });
                    else {
                      var o = e.v,
                        a = e.n,
                        u = r.searchIn(o),
                        s = u.isMatch,
                        f = u.score,
                        h = u.indices;
                      s && i.push({ score: f, key: n, value: o, norm: a, indices: h });
                    }
                    return i;
                  },
                },
              ]),
              t
            );
          })();
          return (
            (J.version = '6.6.2'),
            (J.createIndex = E),
            (J.parseIndex = function (t) {
              var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                e = n.getFn,
                r = void 0 === e ? A.getFn : e,
                i = n.fieldNormWeight,
                o = void 0 === i ? A.fieldNormWeight : i,
                a = t.keys,
                u = t.records,
                s = new S({ getFn: r, fieldNormWeight: o });
              return s.setKeys(a), s.setIndexRecords(u), s;
            }),
            (J.config = A),
            (J.parseQuery = function (t, n) {
              var e = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).auto,
                r = void 0 === e || e,
                i = function t(e) {
                  var i = Object.keys(e),
                    o = H(e);
                  if (!o && i.length > 1 && !Y(e)) return t(B(e));
                  if (X(e)) {
                    var a = o ? e[q] : i[0],
                      u = o ? e[F] : e[a];
                    if (!f(u)) throw new Error(g(a));
                    var s = { keyId: k(a), pattern: u };
                    return r && (s.searcher = j(u, n)), s;
                  }
                  var h = { children: [], operator: i[0] };
                  return (
                    i.forEach(function (n) {
                      var r = e[n];
                      c(r) &&
                        r.forEach(function (n) {
                          h.children.push(t(n));
                        });
                    }),
                    h
                  );
                };
              return Y(t) || (t = B(t)), i(t);
            }),
            J
          );
        })();
      },
    },
    n = {};
  function e(r) {
    var i = n[r];
    if (void 0 !== i) return i.exports;
    var o = (n[r] = { exports: {} });
    return t[r].call(o.exports, o, o.exports, e), o.exports;
  }
  (e.n = (t) => {
    var n = t && t.__esModule ? () => t.default : () => t;
    return e.d(n, { a: n }), n;
  }),
    (e.d = (t, n) => {
      for (var r in n)
        e.o(n, r) && !e.o(t, r) && Object.defineProperty(t, r, { enumerable: !0, get: n[r] });
    }),
    (e.o = (t, n) => Object.prototype.hasOwnProperty.call(t, n)),
    (() => {
      'use strict';
      function t(t, n) {
        for (var e = 0; e < n.length; e++) {
          var r = n[e];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(t, r.key, r);
        }
      }
      function n(t, n, e) {
        return (
          n in t
            ? Object.defineProperty(t, n, {
                value: e,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[n] = e),
          t
        );
      }
      var r = (function () {
        function n() {
          !(function (t, n) {
            if (!(t instanceof n)) throw new TypeError('Cannot call a class as a function');
          })(this, n);
        }
        var e, r;
        return (
          (e = n),
          (r = [
            {
              key: 'reset',
              value: function () {
                console.log('reset view');
              },
            },
          ]),
          null && t(e.prototype, null),
          r && t(e, r),
          Object.defineProperty(e, 'prototype', { writable: !1 }),
          n
        );
      })();
      n(r, 'highlightedNodes', []),
        n(r, 'focusMode', !1),
        n(r, 'openedRecordId', void 0),
        n(r, 'position', { x: 0, y: 0, zoom: 1 });
      const i = {
        actualiser: function (t, n) {
          var e = new URL('#' + t, window.location);
          if (null == history.state) this.init(t, n, e);
          else {
            var r = history.state.hist;
            r.push(t), history.pushState({ hist: r }, n, e);
          }
          document.title = 'Cosma — ' + n;
        },
        init: function (t, n, e) {
          history.pushState({ hist: [t] }, n, e);
        },
      };
      function o(t, n) {
        return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
      }
      var a, u;
      1 === (a = o).length &&
        ((u = a),
        (a = function (t, n) {
          return o(u(t), n);
        }));
      var s = Array.prototype;
      s.slice, s.map, Math.sqrt(50), Math.sqrt(10), Math.sqrt(2), Array.prototype.slice;
      var c = { value: function () {} };
      function f() {
        for (var t, n = 0, e = arguments.length, r = {}; n < e; ++n) {
          if (!(t = arguments[n] + '') || t in r) throw new Error('illegal type: ' + t);
          r[t] = [];
        }
        return new h(r);
      }
      function h(t) {
        this._ = t;
      }
      function l(t, n) {
        return t
          .trim()
          .split(/^|\s+/)
          .map(function (t) {
            var e = '',
              r = t.indexOf('.');
            if ((r >= 0 && ((e = t.slice(r + 1)), (t = t.slice(0, r))), t && !n.hasOwnProperty(t)))
              throw new Error('unknown type: ' + t);
            return { type: t, name: e };
          });
      }
      function d(t, n) {
        for (var e, r = 0, i = t.length; r < i; ++r) if ((e = t[r]).name === n) return e.value;
      }
      function p(t, n, e) {
        for (var r = 0, i = t.length; r < i; ++r)
          if (t[r].name === n) {
            (t[r] = c), (t = t.slice(0, r).concat(t.slice(r + 1)));
            break;
          }
        return null != e && t.push({ name: n, value: e }), t;
      }
      h.prototype = f.prototype = {
        constructor: h,
        on: function (t, n) {
          var e,
            r = this._,
            i = l(t + '', r),
            o = -1,
            a = i.length;
          if (!(arguments.length < 2)) {
            if (null != n && 'function' != typeof n) throw new Error('invalid callback: ' + n);
            for (; ++o < a; )
              if ((e = (t = i[o]).type)) r[e] = p(r[e], t.name, n);
              else if (null == n) for (e in r) r[e] = p(r[e], t.name, null);
            return this;
          }
          for (; ++o < a; ) if ((e = (t = i[o]).type) && (e = d(r[e], t.name))) return e;
        },
        copy: function () {
          var t = {},
            n = this._;
          for (var e in n) t[e] = n[e].slice();
          return new h(t);
        },
        call: function (t, n) {
          if ((e = arguments.length - 2) > 0)
            for (var e, r, i = new Array(e), o = 0; o < e; ++o) i[o] = arguments[o + 2];
          if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t);
          for (o = 0, e = (r = this._[t]).length; o < e; ++o) r[o].value.apply(n, i);
        },
        apply: function (t, n, e) {
          if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t);
          for (var r = this._[t], i = 0, o = r.length; i < o; ++i) r[i].value.apply(n, e);
        },
      };
      const v = f;
      var _ = 'http://www.w3.org/1999/xhtml';
      const y = {
        svg: 'http://www.w3.org/2000/svg',
        xhtml: _,
        xlink: 'http://www.w3.org/1999/xlink',
        xml: 'http://www.w3.org/XML/1998/namespace',
        xmlns: 'http://www.w3.org/2000/xmlns/',
      };
      function g(t) {
        var n = (t += ''),
          e = n.indexOf(':');
        return (
          e >= 0 && 'xmlns' !== (n = t.slice(0, e)) && (t = t.slice(e + 1)),
          y.hasOwnProperty(n) ? { space: y[n], local: t } : t
        );
      }
      function m(t) {
        return function () {
          var n = this.ownerDocument,
            e = this.namespaceURI;
          return e === _ && n.documentElement.namespaceURI === _
            ? n.createElement(t)
            : n.createElementNS(e, t);
        };
      }
      function b(t) {
        return function () {
          return this.ownerDocument.createElementNS(t.space, t.local);
        };
      }
      function w(t) {
        var n = g(t);
        return (n.local ? b : m)(n);
      }
      function x() {}
      function M(t) {
        return null == t
          ? x
          : function () {
              return this.querySelector(t);
            };
      }
      function k() {
        return [];
      }
      function N(t) {
        return null == t
          ? k
          : function () {
              return this.querySelectorAll(t);
            };
      }
      var A = function (t) {
        return function () {
          return this.matches(t);
        };
      };
      if ('undefined' != typeof document) {
        var T = document.documentElement;
        if (!T.matches) {
          var C =
            T.webkitMatchesSelector ||
            T.msMatchesSelector ||
            T.mozMatchesSelector ||
            T.oMatchesSelector;
          A = function (t) {
            return function () {
              return C.call(this, t);
            };
          };
        }
      }
      const S = A;
      function E(t) {
        return new Array(t.length);
      }
      function L(t, n) {
        (this.ownerDocument = t.ownerDocument),
          (this.namespaceURI = t.namespaceURI),
          (this._next = null),
          (this._parent = t),
          (this.__data__ = n);
      }
      function z(t, n, e, r, i, o) {
        for (var a, u = 0, s = n.length, c = o.length; u < c; ++u)
          (a = n[u]) ? ((a.__data__ = o[u]), (r[u] = a)) : (e[u] = new L(t, o[u]));
        for (; u < s; ++u) (a = n[u]) && (i[u] = a);
      }
      function U(t, n, e, r, i, o, a) {
        var u,
          s,
          c,
          f = {},
          h = n.length,
          l = o.length,
          d = new Array(h);
        for (u = 0; u < h; ++u)
          (s = n[u]) &&
            ((d[u] = c = '$' + a.call(s, s.__data__, u, n)), c in f ? (i[u] = s) : (f[c] = s));
        for (u = 0; u < l; ++u)
          (s = f[(c = '$' + a.call(t, o[u], u, o))])
            ? ((r[u] = s), (s.__data__ = o[u]), (f[c] = null))
            : (e[u] = new L(t, o[u]));
        for (u = 0; u < h; ++u) (s = n[u]) && f[d[u]] === s && (i[u] = s);
      }
      function P(t, n) {
        return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
      }
      function I(t) {
        return function () {
          this.removeAttribute(t);
        };
      }
      function D(t) {
        return function () {
          this.removeAttributeNS(t.space, t.local);
        };
      }
      function j(t, n) {
        return function () {
          this.setAttribute(t, n);
        };
      }
      function R(t, n) {
        return function () {
          this.setAttributeNS(t.space, t.local, n);
        };
      }
      function O(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e ? this.removeAttribute(t) : this.setAttribute(t, e);
        };
      }
      function q(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e
            ? this.removeAttributeNS(t.space, t.local)
            : this.setAttributeNS(t.space, t.local, e);
        };
      }
      function F(t) {
        return (
          (t.ownerDocument && t.ownerDocument.defaultView) || (t.document && t) || t.defaultView
        );
      }
      function Y(t) {
        return function () {
          this.style.removeProperty(t);
        };
      }
      function H(t, n, e) {
        return function () {
          this.style.setProperty(t, n, e);
        };
      }
      function X(t, n, e) {
        return function () {
          var r = n.apply(this, arguments);
          null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
        };
      }
      function B(t, n) {
        return t.style.getPropertyValue(n) || F(t).getComputedStyle(t, null).getPropertyValue(n);
      }
      function $(t) {
        return function () {
          delete this[t];
        };
      }
      function W(t, n) {
        return function () {
          this[t] = n;
        };
      }
      function V(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e ? delete this[t] : (this[t] = e);
        };
      }
      function Z(t) {
        return t.trim().split(/^|\s+/);
      }
      function J(t) {
        return t.classList || new Q(t);
      }
      function Q(t) {
        (this._node = t), (this._names = Z(t.getAttribute('class') || ''));
      }
      function G(t, n) {
        for (var e = J(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
      }
      function K(t, n) {
        for (var e = J(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
      }
      function tt(t) {
        return function () {
          G(this, t);
        };
      }
      function nt(t) {
        return function () {
          K(this, t);
        };
      }
      function et(t, n) {
        return function () {
          (n.apply(this, arguments) ? G : K)(this, t);
        };
      }
      function rt() {
        this.textContent = '';
      }
      function it(t) {
        return function () {
          this.textContent = t;
        };
      }
      function ot(t) {
        return function () {
          var n = t.apply(this, arguments);
          this.textContent = null == n ? '' : n;
        };
      }
      function at() {
        this.innerHTML = '';
      }
      function ut(t) {
        return function () {
          this.innerHTML = t;
        };
      }
      function st(t) {
        return function () {
          var n = t.apply(this, arguments);
          this.innerHTML = null == n ? '' : n;
        };
      }
      function ct() {
        this.nextSibling && this.parentNode.appendChild(this);
      }
      function ft() {
        this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
      }
      function ht() {
        return null;
      }
      function lt() {
        var t = this.parentNode;
        t && t.removeChild(this);
      }
      function dt() {
        return this.parentNode.insertBefore(this.cloneNode(!1), this.nextSibling);
      }
      function pt() {
        return this.parentNode.insertBefore(this.cloneNode(!0), this.nextSibling);
      }
      (L.prototype = {
        constructor: L,
        appendChild: function (t) {
          return this._parent.insertBefore(t, this._next);
        },
        insertBefore: function (t, n) {
          return this._parent.insertBefore(t, n);
        },
        querySelector: function (t) {
          return this._parent.querySelector(t);
        },
        querySelectorAll: function (t) {
          return this._parent.querySelectorAll(t);
        },
      }),
        (Q.prototype = {
          add: function (t) {
            this._names.indexOf(t) < 0 &&
              (this._names.push(t), this._node.setAttribute('class', this._names.join(' ')));
          },
          remove: function (t) {
            var n = this._names.indexOf(t);
            n >= 0 &&
              (this._names.splice(n, 1), this._node.setAttribute('class', this._names.join(' ')));
          },
          contains: function (t) {
            return this._names.indexOf(t) >= 0;
          },
        });
      var vt = {},
        _t = null;
      function yt(t, n, e) {
        return (
          (t = gt(t, n, e)),
          function (n) {
            var e = n.relatedTarget;
            (e && (e === this || 8 & e.compareDocumentPosition(this))) || t.call(this, n);
          }
        );
      }
      function gt(t, n, e) {
        return function (r) {
          var i = _t;
          _t = r;
          try {
            t.call(this, this.__data__, n, e);
          } finally {
            _t = i;
          }
        };
      }
      function mt(t) {
        return t
          .trim()
          .split(/^|\s+/)
          .map(function (t) {
            var n = '',
              e = t.indexOf('.');
            return e >= 0 && ((n = t.slice(e + 1)), (t = t.slice(0, e))), { type: t, name: n };
          });
      }
      function bt(t) {
        return function () {
          var n = this.__on;
          if (n) {
            for (var e, r = 0, i = -1, o = n.length; r < o; ++r)
              (e = n[r]),
                (t.type && e.type !== t.type) || e.name !== t.name
                  ? (n[++i] = e)
                  : this.removeEventListener(e.type, e.listener, e.capture);
            ++i ? (n.length = i) : delete this.__on;
          }
        };
      }
      function wt(t, n, e) {
        var r = vt.hasOwnProperty(t.type) ? yt : gt;
        return function (i, o, a) {
          var u,
            s = this.__on,
            c = r(n, o, a);
          if (s)
            for (var f = 0, h = s.length; f < h; ++f)
              if ((u = s[f]).type === t.type && u.name === t.name)
                return (
                  this.removeEventListener(u.type, u.listener, u.capture),
                  this.addEventListener(u.type, (u.listener = c), (u.capture = e)),
                  void (u.value = n)
                );
          this.addEventListener(t.type, c, e),
            (u = { type: t.type, name: t.name, value: n, listener: c, capture: e }),
            s ? s.push(u) : (this.__on = [u]);
        };
      }
      function xt(t, n, e, r) {
        var i = _t;
        (t.sourceEvent = _t), (_t = t);
        try {
          return n.apply(e, r);
        } finally {
          _t = i;
        }
      }
      function Mt(t, n, e) {
        var r = F(t),
          i = r.CustomEvent;
        'function' == typeof i
          ? (i = new i(n, e))
          : ((i = r.document.createEvent('Event')),
            e
              ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
              : i.initEvent(n, !1, !1)),
          t.dispatchEvent(i);
      }
      function kt(t, n) {
        return function () {
          return Mt(this, t, n);
        };
      }
      function Nt(t, n) {
        return function () {
          return Mt(this, t, n.apply(this, arguments));
        };
      }
      'undefined' != typeof document &&
        ('onmouseenter' in document.documentElement ||
          (vt = { mouseenter: 'mouseover', mouseleave: 'mouseout' }));
      var At = [null];
      function Tt(t, n) {
        (this._groups = t), (this._parents = n);
      }
      function Ct() {
        return new Tt([[document.documentElement]], At);
      }
      Tt.prototype = Ct.prototype = {
        constructor: Tt,
        select: function (t) {
          'function' != typeof t && (t = M(t));
          for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
            for (var o, a, u = n[i], s = u.length, c = (r[i] = new Array(s)), f = 0; f < s; ++f)
              (o = u[f]) &&
                (a = t.call(o, o.__data__, f, u)) &&
                ('__data__' in o && (a.__data__ = o.__data__), (c[f] = a));
          return new Tt(r, this._parents);
        },
        selectAll: function (t) {
          'function' != typeof t && (t = N(t));
          for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
            for (var a, u = n[o], s = u.length, c = 0; c < s; ++c)
              (a = u[c]) && (r.push(t.call(a, a.__data__, c, u)), i.push(a));
          return new Tt(r, i);
        },
        filter: function (t) {
          'function' != typeof t && (t = S(t));
          for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
            for (var o, a = n[i], u = a.length, s = (r[i] = []), c = 0; c < u; ++c)
              (o = a[c]) && t.call(o, o.__data__, c, a) && s.push(o);
          return new Tt(r, this._parents);
        },
        data: function (t, n) {
          if (!t)
            return (
              (p = new Array(this.size())),
              (f = -1),
              this.each(function (t) {
                p[++f] = t;
              }),
              p
            );
          var e,
            r = n ? U : z,
            i = this._parents,
            o = this._groups;
          'function' != typeof t &&
            ((e = t),
            (t = function () {
              return e;
            }));
          for (
            var a = o.length, u = new Array(a), s = new Array(a), c = new Array(a), f = 0;
            f < a;
            ++f
          ) {
            var h = i[f],
              l = o[f],
              d = l.length,
              p = t.call(h, h && h.__data__, f, i),
              v = p.length,
              _ = (s[f] = new Array(v)),
              y = (u[f] = new Array(v));
            r(h, l, _, y, (c[f] = new Array(d)), p, n);
            for (var g, m, b = 0, w = 0; b < v; ++b)
              if ((g = _[b])) {
                for (b >= w && (w = b + 1); !(m = y[w]) && ++w < v; );
                g._next = m || null;
              }
          }
          return ((u = new Tt(u, i))._enter = s), (u._exit = c), u;
        },
        enter: function () {
          return new Tt(this._enter || this._groups.map(E), this._parents);
        },
        exit: function () {
          return new Tt(this._exit || this._groups.map(E), this._parents);
        },
        merge: function (t) {
          for (
            var n = this._groups,
              e = t._groups,
              r = n.length,
              i = e.length,
              o = Math.min(r, i),
              a = new Array(r),
              u = 0;
            u < o;
            ++u
          )
            for (
              var s, c = n[u], f = e[u], h = c.length, l = (a[u] = new Array(h)), d = 0;
              d < h;
              ++d
            )
              (s = c[d] || f[d]) && (l[d] = s);
          for (; u < r; ++u) a[u] = n[u];
          return new Tt(a, this._parents);
        },
        order: function () {
          for (var t = this._groups, n = -1, e = t.length; ++n < e; )
            for (var r, i = t[n], o = i.length - 1, a = i[o]; --o >= 0; )
              (r = i[o]) && (a && a !== r.nextSibling && a.parentNode.insertBefore(r, a), (a = r));
          return this;
        },
        sort: function (t) {
          function n(n, e) {
            return n && e ? t(n.__data__, e.__data__) : !n - !e;
          }
          t || (t = P);
          for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o) {
            for (var a, u = e[o], s = u.length, c = (i[o] = new Array(s)), f = 0; f < s; ++f)
              (a = u[f]) && (c[f] = a);
            c.sort(n);
          }
          return new Tt(i, this._parents).order();
        },
        call: function () {
          var t = arguments[0];
          return (arguments[0] = this), t.apply(null, arguments), this;
        },
        nodes: function () {
          var t = new Array(this.size()),
            n = -1;
          return (
            this.each(function () {
              t[++n] = this;
            }),
            t
          );
        },
        node: function () {
          for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
            for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
              var a = r[i];
              if (a) return a;
            }
          return null;
        },
        size: function () {
          var t = 0;
          return (
            this.each(function () {
              ++t;
            }),
            t
          );
        },
        empty: function () {
          return !this.node();
        },
        each: function (t) {
          for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
            for (var i, o = n[e], a = 0, u = o.length; a < u; ++a)
              (i = o[a]) && t.call(i, i.__data__, a, o);
          return this;
        },
        attr: function (t, n) {
          var e = g(t);
          if (arguments.length < 2) {
            var r = this.node();
            return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
          }
          return this.each(
            (null == n
              ? e.local
                ? D
                : I
              : 'function' == typeof n
              ? e.local
                ? q
                : O
              : e.local
              ? R
              : j)(e, n)
          );
        },
        style: function (t, n, e) {
          return arguments.length > 1
            ? this.each((null == n ? Y : 'function' == typeof n ? X : H)(t, n, null == e ? '' : e))
            : B(this.node(), t);
        },
        property: function (t, n) {
          return arguments.length > 1
            ? this.each((null == n ? $ : 'function' == typeof n ? V : W)(t, n))
            : this.node()[t];
        },
        classed: function (t, n) {
          var e = Z(t + '');
          if (arguments.length < 2) {
            for (var r = J(this.node()), i = -1, o = e.length; ++i < o; )
              if (!r.contains(e[i])) return !1;
            return !0;
          }
          return this.each(('function' == typeof n ? et : n ? tt : nt)(e, n));
        },
        text: function (t) {
          return arguments.length
            ? this.each(null == t ? rt : ('function' == typeof t ? ot : it)(t))
            : this.node().textContent;
        },
        html: function (t) {
          return arguments.length
            ? this.each(null == t ? at : ('function' == typeof t ? st : ut)(t))
            : this.node().innerHTML;
        },
        raise: function () {
          return this.each(ct);
        },
        lower: function () {
          return this.each(ft);
        },
        append: function (t) {
          var n = 'function' == typeof t ? t : w(t);
          return this.select(function () {
            return this.appendChild(n.apply(this, arguments));
          });
        },
        insert: function (t, n) {
          var e = 'function' == typeof t ? t : w(t),
            r = null == n ? ht : 'function' == typeof n ? n : M(n);
          return this.select(function () {
            return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null);
          });
        },
        remove: function () {
          return this.each(lt);
        },
        clone: function (t) {
          return this.select(t ? pt : dt);
        },
        datum: function (t) {
          return arguments.length ? this.property('__data__', t) : this.node().__data__;
        },
        on: function (t, n, e) {
          var r,
            i,
            o = mt(t + ''),
            a = o.length;
          if (!(arguments.length < 2)) {
            for (u = n ? wt : bt, null == e && (e = !1), r = 0; r < a; ++r)
              this.each(u(o[r], n, e));
            return this;
          }
          var u = this.node().__on;
          if (u)
            for (var s, c = 0, f = u.length; c < f; ++c)
              for (r = 0, s = u[c]; r < a; ++r)
                if ((i = o[r]).type === s.type && i.name === s.name) return s.value;
        },
        dispatch: function (t, n) {
          return this.each(('function' == typeof n ? Nt : kt)(t, n));
        },
      };
      const St = Ct;
      function Et(t) {
        return 'string' == typeof t
          ? new Tt([[document.querySelector(t)]], [document.documentElement])
          : new Tt([[t]], At);
      }
      var Lt = 0;
      function zt() {
        this._ = '@' + (++Lt).toString(36);
      }
      function Ut() {
        for (var t, n = _t; (t = n.sourceEvent); ) n = t;
        return n;
      }
      function Pt(t, n) {
        var e = t.ownerSVGElement || t;
        if (e.createSVGPoint) {
          var r = e.createSVGPoint();
          return (
            (r.x = n.clientX),
            (r.y = n.clientY),
            [(r = r.matrixTransform(t.getScreenCTM().inverse())).x, r.y]
          );
        }
        var i = t.getBoundingClientRect();
        return [n.clientX - i.left - t.clientLeft, n.clientY - i.top - t.clientTop];
      }
      function It(t) {
        var n = Ut();
        return n.changedTouches && (n = n.changedTouches[0]), Pt(t, n);
      }
      function Dt(t, n, e) {
        arguments.length < 3 && ((e = n), (n = Ut().changedTouches));
        for (var r, i = 0, o = n ? n.length : 0; i < o; ++i)
          if ((r = n[i]).identifier === e) return Pt(t, r);
        return null;
      }
      function jt() {
        _t.stopImmediatePropagation();
      }
      function Rt() {
        _t.preventDefault(), _t.stopImmediatePropagation();
      }
      function Ot(t) {
        var n = t.document.documentElement,
          e = Et(t).on('dragstart.drag', Rt, !0);
        'onselectstart' in n
          ? e.on('selectstart.drag', Rt, !0)
          : ((n.__noselect = n.style.MozUserSelect), (n.style.MozUserSelect = 'none'));
      }
      function qt(t, n) {
        var e = t.document.documentElement,
          r = Et(t).on('dragstart.drag', null);
        n &&
          (r.on('click.drag', Rt, !0),
          setTimeout(function () {
            r.on('click.drag', null);
          }, 0)),
          'onselectstart' in e
            ? r.on('selectstart.drag', null)
            : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
      }
      function Ft(t) {
        return function () {
          return t;
        };
      }
      function Yt(t, n, e, r, i, o, a, u, s, c) {
        (this.target = t),
          (this.type = n),
          (this.subject = e),
          (this.identifier = r),
          (this.active = i),
          (this.x = o),
          (this.y = a),
          (this.dx = u),
          (this.dy = s),
          (this._ = c);
      }
      function Ht() {
        return !_t.button;
      }
      function Xt() {
        return this.parentNode;
      }
      function Bt(t) {
        return null == t ? { x: _t.x, y: _t.y } : t;
      }
      function $t() {
        return 'ontouchstart' in this;
      }
      function Wt(t, n, e) {
        (t.prototype = n.prototype = e), (e.constructor = t);
      }
      function Vt(t, n) {
        var e = Object.create(t.prototype);
        for (var r in n) e[r] = n[r];
        return e;
      }
      function Zt() {}
      (zt.prototype = function () {
        return new zt();
      }.prototype =
        {
          constructor: zt,
          get: function (t) {
            for (var n = this._; !(n in t); ) if (!(t = t.parentNode)) return;
            return t[n];
          },
          set: function (t, n) {
            return (t[this._] = n);
          },
          remove: function (t) {
            return this._ in t && delete t[this._];
          },
          toString: function () {
            return this._;
          },
        }),
        (Yt.prototype.on = function () {
          var t = this._.on.apply(this._, arguments);
          return t === this._ ? this : t;
        });
      var Jt = 0.7,
        Qt = 1 / Jt,
        Gt = '\\s*([+-]?\\d+)\\s*',
        Kt = '\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*',
        tn = '\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*',
        nn = /^#([0-9a-f]{3})$/,
        en = /^#([0-9a-f]{6})$/,
        rn = new RegExp('^rgb\\(' + [Gt, Gt, Gt] + '\\)$'),
        on = new RegExp('^rgb\\(' + [tn, tn, tn] + '\\)$'),
        an = new RegExp('^rgba\\(' + [Gt, Gt, Gt, Kt] + '\\)$'),
        un = new RegExp('^rgba\\(' + [tn, tn, tn, Kt] + '\\)$'),
        sn = new RegExp('^hsl\\(' + [Kt, tn, tn] + '\\)$'),
        cn = new RegExp('^hsla\\(' + [Kt, tn, tn, Kt] + '\\)$'),
        fn = {
          aliceblue: 15792383,
          antiquewhite: 16444375,
          aqua: 65535,
          aquamarine: 8388564,
          azure: 15794175,
          beige: 16119260,
          bisque: 16770244,
          black: 0,
          blanchedalmond: 16772045,
          blue: 255,
          blueviolet: 9055202,
          brown: 10824234,
          burlywood: 14596231,
          cadetblue: 6266528,
          chartreuse: 8388352,
          chocolate: 13789470,
          coral: 16744272,
          cornflowerblue: 6591981,
          cornsilk: 16775388,
          crimson: 14423100,
          cyan: 65535,
          darkblue: 139,
          darkcyan: 35723,
          darkgoldenrod: 12092939,
          darkgray: 11119017,
          darkgreen: 25600,
          darkgrey: 11119017,
          darkkhaki: 12433259,
          darkmagenta: 9109643,
          darkolivegreen: 5597999,
          darkorange: 16747520,
          darkorchid: 10040012,
          darkred: 9109504,
          darksalmon: 15308410,
          darkseagreen: 9419919,
          darkslateblue: 4734347,
          darkslategray: 3100495,
          darkslategrey: 3100495,
          darkturquoise: 52945,
          darkviolet: 9699539,
          deeppink: 16716947,
          deepskyblue: 49151,
          dimgray: 6908265,
          dimgrey: 6908265,
          dodgerblue: 2003199,
          firebrick: 11674146,
          floralwhite: 16775920,
          forestgreen: 2263842,
          fuchsia: 16711935,
          gainsboro: 14474460,
          ghostwhite: 16316671,
          gold: 16766720,
          goldenrod: 14329120,
          gray: 8421504,
          green: 32768,
          greenyellow: 11403055,
          grey: 8421504,
          honeydew: 15794160,
          hotpink: 16738740,
          indianred: 13458524,
          indigo: 4915330,
          ivory: 16777200,
          khaki: 15787660,
          lavender: 15132410,
          lavenderblush: 16773365,
          lawngreen: 8190976,
          lemonchiffon: 16775885,
          lightblue: 11393254,
          lightcoral: 15761536,
          lightcyan: 14745599,
          lightgoldenrodyellow: 16448210,
          lightgray: 13882323,
          lightgreen: 9498256,
          lightgrey: 13882323,
          lightpink: 16758465,
          lightsalmon: 16752762,
          lightseagreen: 2142890,
          lightskyblue: 8900346,
          lightslategray: 7833753,
          lightslategrey: 7833753,
          lightsteelblue: 11584734,
          lightyellow: 16777184,
          lime: 65280,
          limegreen: 3329330,
          linen: 16445670,
          magenta: 16711935,
          maroon: 8388608,
          mediumaquamarine: 6737322,
          mediumblue: 205,
          mediumorchid: 12211667,
          mediumpurple: 9662683,
          mediumseagreen: 3978097,
          mediumslateblue: 8087790,
          mediumspringgreen: 64154,
          mediumturquoise: 4772300,
          mediumvioletred: 13047173,
          midnightblue: 1644912,
          mintcream: 16121850,
          mistyrose: 16770273,
          moccasin: 16770229,
          navajowhite: 16768685,
          navy: 128,
          oldlace: 16643558,
          olive: 8421376,
          olivedrab: 7048739,
          orange: 16753920,
          orangered: 16729344,
          orchid: 14315734,
          palegoldenrod: 15657130,
          palegreen: 10025880,
          paleturquoise: 11529966,
          palevioletred: 14381203,
          papayawhip: 16773077,
          peachpuff: 16767673,
          peru: 13468991,
          pink: 16761035,
          plum: 14524637,
          powderblue: 11591910,
          purple: 8388736,
          rebeccapurple: 6697881,
          red: 16711680,
          rosybrown: 12357519,
          royalblue: 4286945,
          saddlebrown: 9127187,
          salmon: 16416882,
          sandybrown: 16032864,
          seagreen: 3050327,
          seashell: 16774638,
          sienna: 10506797,
          silver: 12632256,
          skyblue: 8900331,
          slateblue: 6970061,
          slategray: 7372944,
          slategrey: 7372944,
          snow: 16775930,
          springgreen: 65407,
          steelblue: 4620980,
          tan: 13808780,
          teal: 32896,
          thistle: 14204888,
          tomato: 16737095,
          turquoise: 4251856,
          violet: 15631086,
          wheat: 16113331,
          white: 16777215,
          whitesmoke: 16119285,
          yellow: 16776960,
          yellowgreen: 10145074,
        };
      function hn(t) {
        var n;
        return (
          (t = (t + '').trim().toLowerCase()),
          (n = nn.exec(t))
            ? new _n(
                (((n = parseInt(n[1], 16)) >> 8) & 15) | ((n >> 4) & 240),
                ((n >> 4) & 15) | (240 & n),
                ((15 & n) << 4) | (15 & n),
                1
              )
            : (n = en.exec(t))
            ? ln(parseInt(n[1], 16))
            : (n = rn.exec(t))
            ? new _n(n[1], n[2], n[3], 1)
            : (n = on.exec(t))
            ? new _n((255 * n[1]) / 100, (255 * n[2]) / 100, (255 * n[3]) / 100, 1)
            : (n = an.exec(t))
            ? dn(n[1], n[2], n[3], n[4])
            : (n = un.exec(t))
            ? dn((255 * n[1]) / 100, (255 * n[2]) / 100, (255 * n[3]) / 100, n[4])
            : (n = sn.exec(t))
            ? yn(n[1], n[2] / 100, n[3] / 100, 1)
            : (n = cn.exec(t))
            ? yn(n[1], n[2] / 100, n[3] / 100, n[4])
            : fn.hasOwnProperty(t)
            ? ln(fn[t])
            : 'transparent' === t
            ? new _n(NaN, NaN, NaN, 0)
            : null
        );
      }
      function ln(t) {
        return new _n((t >> 16) & 255, (t >> 8) & 255, 255 & t, 1);
      }
      function dn(t, n, e, r) {
        return r <= 0 && (t = n = e = NaN), new _n(t, n, e, r);
      }
      function pn(t) {
        return (
          t instanceof Zt || (t = hn(t)),
          t ? new _n((t = t.rgb()).r, t.g, t.b, t.opacity) : new _n()
        );
      }
      function vn(t, n, e, r) {
        return 1 === arguments.length ? pn(t) : new _n(t, n, e, null == r ? 1 : r);
      }
      function _n(t, n, e, r) {
        (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
      }
      function yn(t, n, e, r) {
        return (
          r <= 0 ? (t = n = e = NaN) : e <= 0 || e >= 1 ? (t = n = NaN) : n <= 0 && (t = NaN),
          new bn(t, n, e, r)
        );
      }
      function gn(t) {
        if (t instanceof bn) return new bn(t.h, t.s, t.l, t.opacity);
        if ((t instanceof Zt || (t = hn(t)), !t)) return new bn();
        if (t instanceof bn) return t;
        var n = (t = t.rgb()).r / 255,
          e = t.g / 255,
          r = t.b / 255,
          i = Math.min(n, e, r),
          o = Math.max(n, e, r),
          a = NaN,
          u = o - i,
          s = (o + i) / 2;
        return (
          u
            ? ((a =
                n === o ? (e - r) / u + 6 * (e < r) : e === o ? (r - n) / u + 2 : (n - e) / u + 4),
              (u /= s < 0.5 ? o + i : 2 - o - i),
              (a *= 60))
            : (u = s > 0 && s < 1 ? 0 : a),
          new bn(a, u, s, t.opacity)
        );
      }
      function mn(t, n, e, r) {
        return 1 === arguments.length ? gn(t) : new bn(t, n, e, null == r ? 1 : r);
      }
      function bn(t, n, e, r) {
        (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
      }
      function wn(t, n, e) {
        return (
          255 *
          (t < 60
            ? n + ((e - n) * t) / 60
            : t < 180
            ? e
            : t < 240
            ? n + ((e - n) * (240 - t)) / 60
            : n)
        );
      }
      Wt(Zt, hn, {
        displayable: function () {
          return this.rgb().displayable();
        },
        toString: function () {
          return this.rgb() + '';
        },
      }),
        Wt(
          _n,
          vn,
          Vt(Zt, {
            brighter: function (t) {
              return (
                (t = null == t ? Qt : Math.pow(Qt, t)),
                new _n(this.r * t, this.g * t, this.b * t, this.opacity)
              );
            },
            darker: function (t) {
              return (
                (t = null == t ? Jt : Math.pow(Jt, t)),
                new _n(this.r * t, this.g * t, this.b * t, this.opacity)
              );
            },
            rgb: function () {
              return this;
            },
            displayable: function () {
              return (
                0 <= this.r &&
                this.r <= 255 &&
                0 <= this.g &&
                this.g <= 255 &&
                0 <= this.b &&
                this.b <= 255 &&
                0 <= this.opacity &&
                this.opacity <= 1
              );
            },
            toString: function () {
              var t = this.opacity;
              return (
                (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? 'rgb(' : 'rgba(') +
                Math.max(0, Math.min(255, Math.round(this.r) || 0)) +
                ', ' +
                Math.max(0, Math.min(255, Math.round(this.g) || 0)) +
                ', ' +
                Math.max(0, Math.min(255, Math.round(this.b) || 0)) +
                (1 === t ? ')' : ', ' + t + ')')
              );
            },
          })
        ),
        Wt(
          bn,
          mn,
          Vt(Zt, {
            brighter: function (t) {
              return (
                (t = null == t ? Qt : Math.pow(Qt, t)),
                new bn(this.h, this.s, this.l * t, this.opacity)
              );
            },
            darker: function (t) {
              return (
                (t = null == t ? Jt : Math.pow(Jt, t)),
                new bn(this.h, this.s, this.l * t, this.opacity)
              );
            },
            rgb: function () {
              var t = (this.h % 360) + 360 * (this.h < 0),
                n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
                e = this.l,
                r = e + (e < 0.5 ? e : 1 - e) * n,
                i = 2 * e - r;
              return new _n(
                wn(t >= 240 ? t - 240 : t + 120, i, r),
                wn(t, i, r),
                wn(t < 120 ? t + 240 : t - 120, i, r),
                this.opacity
              );
            },
            displayable: function () {
              return (
                ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
                0 <= this.l &&
                this.l <= 1 &&
                0 <= this.opacity &&
                this.opacity <= 1
              );
            },
          })
        );
      var xn = Math.PI / 180,
        Mn = 180 / Math.PI,
        kn = 0.95047,
        Nn = 1.08883,
        An = 4 / 29,
        Tn = 6 / 29,
        Cn = 3 * Tn * Tn;
      function Sn(t) {
        if (t instanceof En) return new En(t.l, t.a, t.b, t.opacity);
        if (t instanceof jn) {
          var n = t.h * xn;
          return new En(t.l, Math.cos(n) * t.c, Math.sin(n) * t.c, t.opacity);
        }
        t instanceof _n || (t = pn(t));
        var e = Pn(t.r),
          r = Pn(t.g),
          i = Pn(t.b),
          o = Ln((0.4124564 * e + 0.3575761 * r + 0.1804375 * i) / kn),
          a = Ln((0.2126729 * e + 0.7151522 * r + 0.072175 * i) / 1);
        return new En(
          116 * a - 16,
          500 * (o - a),
          200 * (a - Ln((0.0193339 * e + 0.119192 * r + 0.9503041 * i) / Nn)),
          t.opacity
        );
      }
      function En(t, n, e, r) {
        (this.l = +t), (this.a = +n), (this.b = +e), (this.opacity = +r);
      }
      function Ln(t) {
        return t > 0.008856451679035631 ? Math.pow(t, 1 / 3) : t / Cn + An;
      }
      function zn(t) {
        return t > Tn ? t * t * t : Cn * (t - An);
      }
      function Un(t) {
        return 255 * (t <= 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055);
      }
      function Pn(t) {
        return (t /= 255) <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
      }
      function In(t) {
        if (t instanceof jn) return new jn(t.h, t.c, t.l, t.opacity);
        t instanceof En || (t = Sn(t));
        var n = Math.atan2(t.b, t.a) * Mn;
        return new jn(n < 0 ? n + 360 : n, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity);
      }
      function Dn(t, n, e, r) {
        return 1 === arguments.length ? In(t) : new jn(t, n, e, null == r ? 1 : r);
      }
      function jn(t, n, e, r) {
        (this.h = +t), (this.c = +n), (this.l = +e), (this.opacity = +r);
      }
      Wt(
        En,
        function (t, n, e, r) {
          return 1 === arguments.length ? Sn(t) : new En(t, n, e, null == r ? 1 : r);
        },
        Vt(Zt, {
          brighter: function (t) {
            return new En(this.l + 18 * (null == t ? 1 : t), this.a, this.b, this.opacity);
          },
          darker: function (t) {
            return new En(this.l - 18 * (null == t ? 1 : t), this.a, this.b, this.opacity);
          },
          rgb: function () {
            var t = (this.l + 16) / 116,
              n = isNaN(this.a) ? t : t + this.a / 500,
              e = isNaN(this.b) ? t : t - this.b / 200;
            return (
              (t = 1 * zn(t)),
              new _n(
                Un(3.2404542 * (n = kn * zn(n)) - 1.5371385 * t - 0.4985314 * (e = Nn * zn(e))),
                Un(-0.969266 * n + 1.8760108 * t + 0.041556 * e),
                Un(0.0556434 * n - 0.2040259 * t + 1.0572252 * e),
                this.opacity
              )
            );
          },
        })
      ),
        Wt(
          jn,
          Dn,
          Vt(Zt, {
            brighter: function (t) {
              return new jn(this.h, this.c, this.l + 18 * (null == t ? 1 : t), this.opacity);
            },
            darker: function (t) {
              return new jn(this.h, this.c, this.l - 18 * (null == t ? 1 : t), this.opacity);
            },
            rgb: function () {
              return Sn(this).rgb();
            },
          })
        );
      var Rn = -0.14861,
        On = 1.78277,
        qn = -0.29227,
        Fn = -0.90649,
        Yn = 1.97294,
        Hn = Yn * Fn,
        Xn = Yn * On,
        Bn = On * qn - Fn * Rn;
      function $n(t) {
        if (t instanceof Vn) return new Vn(t.h, t.s, t.l, t.opacity);
        t instanceof _n || (t = pn(t));
        var n = t.r / 255,
          e = t.g / 255,
          r = t.b / 255,
          i = (Bn * r + Hn * n - Xn * e) / (Bn + Hn - Xn),
          o = r - i,
          a = (Yn * (e - i) - qn * o) / Fn,
          u = Math.sqrt(a * a + o * o) / (Yn * i * (1 - i)),
          s = u ? Math.atan2(a, o) * Mn - 120 : NaN;
        return new Vn(s < 0 ? s + 360 : s, u, i, t.opacity);
      }
      function Wn(t, n, e, r) {
        return 1 === arguments.length ? $n(t) : new Vn(t, n, e, null == r ? 1 : r);
      }
      function Vn(t, n, e, r) {
        (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
      }
      function Zn(t, n, e, r, i) {
        var o = t * t,
          a = o * t;
        return (
          ((1 - 3 * t + 3 * o - a) * n +
            (4 - 6 * o + 3 * a) * e +
            (1 + 3 * t + 3 * o - 3 * a) * r +
            a * i) /
          6
        );
      }
      function Jn(t) {
        return function () {
          return t;
        };
      }
      function Qn(t, n) {
        return function (e) {
          return t + e * n;
        };
      }
      function Gn(t, n) {
        var e = n - t;
        return e
          ? Qn(t, e > 180 || e < -180 ? e - 360 * Math.round(e / 360) : e)
          : Jn(isNaN(t) ? n : t);
      }
      function Kn(t, n) {
        var e = n - t;
        return e ? Qn(t, e) : Jn(isNaN(t) ? n : t);
      }
      Wt(
        Vn,
        Wn,
        Vt(Zt, {
          brighter: function (t) {
            return (
              (t = null == t ? Qt : Math.pow(Qt, t)),
              new Vn(this.h, this.s, this.l * t, this.opacity)
            );
          },
          darker: function (t) {
            return (
              (t = null == t ? Jt : Math.pow(Jt, t)),
              new Vn(this.h, this.s, this.l * t, this.opacity)
            );
          },
          rgb: function () {
            var t = isNaN(this.h) ? 0 : (this.h + 120) * xn,
              n = +this.l,
              e = isNaN(this.s) ? 0 : this.s * n * (1 - n),
              r = Math.cos(t),
              i = Math.sin(t);
            return new _n(
              255 * (n + e * (Rn * r + On * i)),
              255 * (n + e * (qn * r + Fn * i)),
              255 * (n + e * (Yn * r)),
              this.opacity
            );
          },
        })
      );
      const te = (function t(n) {
        var e = (function (t) {
          return 1 == (t = +t)
            ? Kn
            : function (n, e) {
                return e - n
                  ? (function (t, n, e) {
                      return (
                        (t = Math.pow(t, e)),
                        (n = Math.pow(n, e) - t),
                        (e = 1 / e),
                        function (r) {
                          return Math.pow(t + r * n, e);
                        }
                      );
                    })(n, e, t)
                  : Jn(isNaN(n) ? e : n);
              };
        })(n);
        function r(t, n) {
          var r = e((t = vn(t)).r, (n = vn(n)).r),
            i = e(t.g, n.g),
            o = e(t.b, n.b),
            a = Kn(t.opacity, n.opacity);
          return function (n) {
            return (t.r = r(n)), (t.g = i(n)), (t.b = o(n)), (t.opacity = a(n)), t + '';
          };
        }
        return (r.gamma = t), r;
      })(1);
      function ne(t) {
        return function (n) {
          var e,
            r,
            i = n.length,
            o = new Array(i),
            a = new Array(i),
            u = new Array(i);
          for (e = 0; e < i; ++e)
            (r = vn(n[e])), (o[e] = r.r || 0), (a[e] = r.g || 0), (u[e] = r.b || 0);
          return (
            (o = t(o)),
            (a = t(a)),
            (u = t(u)),
            (r.opacity = 1),
            function (t) {
              return (r.r = o(t)), (r.g = a(t)), (r.b = u(t)), r + '';
            }
          );
        };
      }
      function ee(t, n) {
        return (
          (n -= t = +t),
          function (e) {
            return t + n * e;
          }
        );
      }
      ne(function (t) {
        var n = t.length - 1;
        return function (e) {
          var r = e <= 0 ? (e = 0) : e >= 1 ? ((e = 1), n - 1) : Math.floor(e * n),
            i = t[r],
            o = t[r + 1],
            a = r > 0 ? t[r - 1] : 2 * i - o,
            u = r < n - 1 ? t[r + 2] : 2 * o - i;
          return Zn((e - r / n) * n, a, i, o, u);
        };
      }),
        ne(function (t) {
          var n = t.length;
          return function (e) {
            var r = Math.floor(((e %= 1) < 0 ? ++e : e) * n),
              i = t[(r + n - 1) % n],
              o = t[r % n],
              a = t[(r + 1) % n],
              u = t[(r + 2) % n];
            return Zn((e - r / n) * n, i, o, a, u);
          };
        });
      var re = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        ie = new RegExp(re.source, 'g');
      function oe(t, n) {
        var e,
          r,
          i,
          o = (re.lastIndex = ie.lastIndex = 0),
          a = -1,
          u = [],
          s = [];
        for (t += '', n += ''; (e = re.exec(t)) && (r = ie.exec(n)); )
          (i = r.index) > o && ((i = n.slice(o, i)), u[a] ? (u[a] += i) : (u[++a] = i)),
            (e = e[0]) === (r = r[0])
              ? u[a]
                ? (u[a] += r)
                : (u[++a] = r)
              : ((u[++a] = null), s.push({ i: a, x: ee(e, r) })),
            (o = ie.lastIndex);
        return (
          o < n.length && ((i = n.slice(o)), u[a] ? (u[a] += i) : (u[++a] = i)),
          u.length < 2
            ? s[0]
              ? (function (t) {
                  return function (n) {
                    return t(n) + '';
                  };
                })(s[0].x)
              : (function (t) {
                  return function () {
                    return t;
                  };
                })(n)
            : ((n = s.length),
              function (t) {
                for (var e, r = 0; r < n; ++r) u[(e = s[r]).i] = e.x(t);
                return u.join('');
              })
        );
      }
      var ae,
        ue,
        se,
        ce,
        fe = 180 / Math.PI,
        he = { translateX: 0, translateY: 0, rotate: 0, skewX: 0, scaleX: 1, scaleY: 1 };
      function le(t, n, e, r, i, o) {
        var a, u, s;
        return (
          (a = Math.sqrt(t * t + n * n)) && ((t /= a), (n /= a)),
          (s = t * e + n * r) && ((e -= t * s), (r -= n * s)),
          (u = Math.sqrt(e * e + r * r)) && ((e /= u), (r /= u), (s /= u)),
          t * r < n * e && ((t = -t), (n = -n), (s = -s), (a = -a)),
          {
            translateX: i,
            translateY: o,
            rotate: Math.atan2(n, t) * fe,
            skewX: Math.atan(s) * fe,
            scaleX: a,
            scaleY: u,
          }
        );
      }
      function de(t, n, e, r) {
        function i(t) {
          return t.length ? t.pop() + ' ' : '';
        }
        return function (o, a) {
          var u = [],
            s = [];
          return (
            (o = t(o)),
            (a = t(a)),
            (function (t, r, i, o, a, u) {
              if (t !== i || r !== o) {
                var s = a.push('translate(', null, n, null, e);
                u.push({ i: s - 4, x: ee(t, i) }, { i: s - 2, x: ee(r, o) });
              } else (i || o) && a.push('translate(' + i + n + o + e);
            })(o.translateX, o.translateY, a.translateX, a.translateY, u, s),
            (function (t, n, e, o) {
              t !== n
                ? (t - n > 180 ? (n += 360) : n - t > 180 && (t += 360),
                  o.push({ i: e.push(i(e) + 'rotate(', null, r) - 2, x: ee(t, n) }))
                : n && e.push(i(e) + 'rotate(' + n + r);
            })(o.rotate, a.rotate, u, s),
            (function (t, n, e, o) {
              t !== n
                ? o.push({ i: e.push(i(e) + 'skewX(', null, r) - 2, x: ee(t, n) })
                : n && e.push(i(e) + 'skewX(' + n + r);
            })(o.skewX, a.skewX, u, s),
            (function (t, n, e, r, o, a) {
              if (t !== e || n !== r) {
                var u = o.push(i(o) + 'scale(', null, ',', null, ')');
                a.push({ i: u - 4, x: ee(t, e) }, { i: u - 2, x: ee(n, r) });
              } else (1 === e && 1 === r) || o.push(i(o) + 'scale(' + e + ',' + r + ')');
            })(o.scaleX, o.scaleY, a.scaleX, a.scaleY, u, s),
            (o = a = null),
            function (t) {
              for (var n, e = -1, r = s.length; ++e < r; ) u[(n = s[e]).i] = n.x(t);
              return u.join('');
            }
          );
        };
      }
      var pe = de(
          function (t) {
            return 'none' === t
              ? he
              : (ae ||
                  ((ae = document.createElement('DIV')),
                  (ue = document.documentElement),
                  (se = document.defaultView)),
                (ae.style.transform = t),
                (t = se.getComputedStyle(ue.appendChild(ae), null).getPropertyValue('transform')),
                ue.removeChild(ae),
                le(+(t = t.slice(7, -1).split(','))[0], +t[1], +t[2], +t[3], +t[4], +t[5]));
          },
          'px, ',
          'px)',
          'deg)'
        ),
        ve = de(
          function (t) {
            return null == t
              ? he
              : (ce || (ce = document.createElementNS('http://www.w3.org/2000/svg', 'g')),
                ce.setAttribute('transform', t),
                (t = ce.transform.baseVal.consolidate())
                  ? le((t = t.matrix).a, t.b, t.c, t.d, t.e, t.f)
                  : he);
          },
          ', ',
          ')',
          ')'
        ),
        _e = Math.SQRT2;
      function ye(t) {
        return ((t = Math.exp(t)) + 1 / t) / 2;
      }
      function ge(t, n) {
        var e,
          r,
          i = t[0],
          o = t[1],
          a = t[2],
          u = n[0],
          s = n[1],
          c = n[2],
          f = u - i,
          h = s - o,
          l = f * f + h * h;
        if (l < 1e-12)
          (r = Math.log(c / a) / _e),
            (e = function (t) {
              return [i + t * f, o + t * h, a * Math.exp(_e * t * r)];
            });
        else {
          var d = Math.sqrt(l),
            p = (c * c - a * a + 4 * l) / (2 * a * 2 * d),
            v = (c * c - a * a - 4 * l) / (2 * c * 2 * d),
            _ = Math.log(Math.sqrt(p * p + 1) - p),
            y = Math.log(Math.sqrt(v * v + 1) - v);
          (r = (y - _) / _e),
            (e = function (t) {
              var n,
                e = t * r,
                u = ye(_),
                s =
                  (a / (2 * d)) *
                  (u * ((n = _e * e + _), ((n = Math.exp(2 * n)) - 1) / (n + 1)) -
                    (function (t) {
                      return ((t = Math.exp(t)) - 1 / t) / 2;
                    })(_));
              return [i + s * f, o + s * h, (a * u) / ye(_e * e + _)];
            });
        }
        return (e.duration = 1e3 * r), e;
      }
      function me(t) {
        return function (n, e) {
          var r = t((n = mn(n)).h, (e = mn(e)).h),
            i = Kn(n.s, e.s),
            o = Kn(n.l, e.l),
            a = Kn(n.opacity, e.opacity);
          return function (t) {
            return (n.h = r(t)), (n.s = i(t)), (n.l = o(t)), (n.opacity = a(t)), n + '';
          };
        };
      }
      function be(t) {
        return function (n, e) {
          var r = t((n = Dn(n)).h, (e = Dn(e)).h),
            i = Kn(n.c, e.c),
            o = Kn(n.l, e.l),
            a = Kn(n.opacity, e.opacity);
          return function (t) {
            return (n.h = r(t)), (n.c = i(t)), (n.l = o(t)), (n.opacity = a(t)), n + '';
          };
        };
      }
      function we(t) {
        return (function n(e) {
          function r(n, r) {
            var i = t((n = Wn(n)).h, (r = Wn(r)).h),
              o = Kn(n.s, r.s),
              a = Kn(n.l, r.l),
              u = Kn(n.opacity, r.opacity);
            return function (t) {
              return (
                (n.h = i(t)), (n.s = o(t)), (n.l = a(Math.pow(t, e))), (n.opacity = u(t)), n + ''
              );
            };
          }
          return (e = +e), (r.gamma = n), r;
        })(1);
      }
      me(Gn), me(Kn), be(Gn), be(Kn), we(Gn);
      var xe,
        Me,
        ke = we(Kn),
        Ne = 0,
        Ae = 0,
        Te = 0,
        Ce = 0,
        Se = 0,
        Ee = 0,
        Le = 'object' == typeof performance && performance.now ? performance : Date,
        ze =
          'object' == typeof window && window.requestAnimationFrame
            ? window.requestAnimationFrame.bind(window)
            : function (t) {
                setTimeout(t, 17);
              };
      function Ue() {
        return Se || (ze(Pe), (Se = Le.now() + Ee));
      }
      function Pe() {
        Se = 0;
      }
      function Ie() {
        this._call = this._time = this._next = null;
      }
      function De(t, n, e) {
        var r = new Ie();
        return r.restart(t, n, e), r;
      }
      function je() {
        (Se = (Ce = Le.now()) + Ee), (Ne = Ae = 0);
        try {
          !(function () {
            Ue(), ++Ne;
            for (var t, n = xe; n; )
              (t = Se - n._time) >= 0 && n._call.call(null, t), (n = n._next);
            --Ne;
          })();
        } finally {
          (Ne = 0),
            (function () {
              for (var t, n, e = xe, r = 1 / 0; e; )
                e._call
                  ? (r > e._time && (r = e._time), (t = e), (e = e._next))
                  : ((n = e._next), (e._next = null), (e = t ? (t._next = n) : (xe = n)));
              (Me = t), Oe(r);
            })(),
            (Se = 0);
        }
      }
      function Re() {
        var t = Le.now(),
          n = t - Ce;
        n > 1e3 && ((Ee -= n), (Ce = t));
      }
      function Oe(t) {
        Ne ||
          (Ae && (Ae = clearTimeout(Ae)),
          t - Se > 24
            ? (t < 1 / 0 && (Ae = setTimeout(je, t - Le.now() - Ee)),
              Te && (Te = clearInterval(Te)))
            : (Te || ((Ce = Le.now()), (Te = setInterval(Re, 1e3))), (Ne = 1), ze(je)));
      }
      function qe(t, n, e) {
        var r = new Ie();
        return (
          (n = null == n ? 0 : +n),
          r.restart(
            function (e) {
              r.stop(), t(e + n);
            },
            n,
            e
          ),
          r
        );
      }
      Ie.prototype = De.prototype = {
        constructor: Ie,
        restart: function (t, n, e) {
          if ('function' != typeof t) throw new TypeError('callback is not a function');
          (e = (null == e ? Ue() : +e) + (null == n ? 0 : +n)),
            this._next || Me === this || (Me ? (Me._next = this) : (xe = this), (Me = this)),
            (this._call = t),
            (this._time = e),
            Oe();
        },
        stop: function () {
          this._call && ((this._call = null), (this._time = 1 / 0), Oe());
        },
      };
      var Fe = v('start', 'end', 'interrupt'),
        Ye = [];
      function He(t, n, e, r, i, o) {
        var a = t.__transition;
        if (a) {
          if (e in a) return;
        } else t.__transition = {};
        !(function (t, n, e) {
          var r,
            i = t.__transition;
          function o(s) {
            var c, f, h, l;
            if (1 !== e.state) return u();
            for (c in i)
              if ((l = i[c]).name === e.name) {
                if (3 === l.state) return qe(o);
                4 === l.state
                  ? ((l.state = 6),
                    l.timer.stop(),
                    l.on.call('interrupt', t, t.__data__, l.index, l.group),
                    delete i[c])
                  : +c < n && ((l.state = 6), l.timer.stop(), delete i[c]);
              }
            if (
              (qe(function () {
                3 === e.state && ((e.state = 4), e.timer.restart(a, e.delay, e.time), a(s));
              }),
              (e.state = 2),
              e.on.call('start', t, t.__data__, e.index, e.group),
              2 === e.state)
            ) {
              for (e.state = 3, r = new Array((h = e.tween.length)), c = 0, f = -1; c < h; ++c)
                (l = e.tween[c].value.call(t, t.__data__, e.index, e.group)) && (r[++f] = l);
              r.length = f + 1;
            }
          }
          function a(n) {
            for (
              var i =
                  n < e.duration
                    ? e.ease.call(null, n / e.duration)
                    : (e.timer.restart(u), (e.state = 5), 1),
                o = -1,
                a = r.length;
              ++o < a;

            )
              r[o].call(null, i);
            5 === e.state && (e.on.call('end', t, t.__data__, e.index, e.group), u());
          }
          function u() {
            for (var r in ((e.state = 6), e.timer.stop(), delete i[n], i)) return;
            delete t.__transition;
          }
          (i[n] = e),
            (e.timer = De(
              function (t) {
                (e.state = 1), e.timer.restart(o, e.delay, e.time), e.delay <= t && o(t - e.delay);
              },
              0,
              e.time
            ));
        })(t, e, {
          name: n,
          index: r,
          group: i,
          on: Fe,
          tween: Ye,
          time: o.time,
          delay: o.delay,
          duration: o.duration,
          ease: o.ease,
          timer: null,
          state: 0,
        });
      }
      function Xe(t, n) {
        var e = $e(t, n);
        if (e.state > 0) throw new Error('too late; already scheduled');
        return e;
      }
      function Be(t, n) {
        var e = $e(t, n);
        if (e.state > 2) throw new Error('too late; already started');
        return e;
      }
      function $e(t, n) {
        var e = t.__transition;
        if (!e || !(e = e[n])) throw new Error('transition not found');
        return e;
      }
      function We(t, n) {
        var e,
          r,
          i,
          o = t.__transition,
          a = !0;
        if (o) {
          for (i in ((n = null == n ? null : n + ''), o))
            (e = o[i]).name === n
              ? ((r = e.state > 2 && e.state < 5),
                (e.state = 6),
                e.timer.stop(),
                r && e.on.call('interrupt', t, t.__data__, e.index, e.group),
                delete o[i])
              : (a = !1);
          a && delete t.__transition;
        }
      }
      function Ve(t, n) {
        var e, r;
        return function () {
          var i = Be(this, t),
            o = i.tween;
          if (o !== e)
            for (var a = 0, u = (r = e = o).length; a < u; ++a)
              if (r[a].name === n) {
                (r = r.slice()).splice(a, 1);
                break;
              }
          i.tween = r;
        };
      }
      function Ze(t, n, e) {
        var r, i;
        if ('function' != typeof e) throw new Error();
        return function () {
          var o = Be(this, t),
            a = o.tween;
          if (a !== r) {
            i = (r = a).slice();
            for (var u = { name: n, value: e }, s = 0, c = i.length; s < c; ++s)
              if (i[s].name === n) {
                i[s] = u;
                break;
              }
            s === c && i.push(u);
          }
          o.tween = i;
        };
      }
      function Je(t, n, e) {
        var r = t._id;
        return (
          t.each(function () {
            var t = Be(this, r);
            (t.value || (t.value = {}))[n] = e.apply(this, arguments);
          }),
          function (t) {
            return $e(t, r).value[n];
          }
        );
      }
      function Qe(t, n) {
        var e;
        return (
          'number' == typeof n ? ee : n instanceof hn ? te : (e = hn(n)) ? ((n = e), te) : oe
        )(t, n);
      }
      function Ge(t) {
        return function () {
          this.removeAttribute(t);
        };
      }
      function Ke(t) {
        return function () {
          this.removeAttributeNS(t.space, t.local);
        };
      }
      function tr(t, n, e) {
        var r, i;
        return function () {
          var o = this.getAttribute(t);
          return o === e ? null : o === r ? i : (i = n((r = o), e));
        };
      }
      function nr(t, n, e) {
        var r, i;
        return function () {
          var o = this.getAttributeNS(t.space, t.local);
          return o === e ? null : o === r ? i : (i = n((r = o), e));
        };
      }
      function er(t, n, e) {
        var r, i, o;
        return function () {
          var a,
            u = e(this);
          if (null != u)
            return (a = this.getAttribute(t)) === u
              ? null
              : a === r && u === i
              ? o
              : (o = n((r = a), (i = u)));
          this.removeAttribute(t);
        };
      }
      function rr(t, n, e) {
        var r, i, o;
        return function () {
          var a,
            u = e(this);
          if (null != u)
            return (a = this.getAttributeNS(t.space, t.local)) === u
              ? null
              : a === r && u === i
              ? o
              : (o = n((r = a), (i = u)));
          this.removeAttributeNS(t.space, t.local);
        };
      }
      function ir(t, n) {
        function e() {
          var e = this,
            r = n.apply(e, arguments);
          return (
            r &&
            function (n) {
              e.setAttributeNS(t.space, t.local, r(n));
            }
          );
        }
        return (e._value = n), e;
      }
      function or(t, n) {
        function e() {
          var e = this,
            r = n.apply(e, arguments);
          return (
            r &&
            function (n) {
              e.setAttribute(t, r(n));
            }
          );
        }
        return (e._value = n), e;
      }
      function ar(t, n) {
        return function () {
          Xe(this, t).delay = +n.apply(this, arguments);
        };
      }
      function ur(t, n) {
        return (
          (n = +n),
          function () {
            Xe(this, t).delay = n;
          }
        );
      }
      function sr(t, n) {
        return function () {
          Be(this, t).duration = +n.apply(this, arguments);
        };
      }
      function cr(t, n) {
        return (
          (n = +n),
          function () {
            Be(this, t).duration = n;
          }
        );
      }
      function fr(t, n) {
        if ('function' != typeof n) throw new Error();
        return function () {
          Be(this, t).ease = n;
        };
      }
      function hr(t, n, e) {
        var r,
          i,
          o = (function (t) {
            return (t + '')
              .trim()
              .split(/^|\s+/)
              .every(function (t) {
                var n = t.indexOf('.');
                return n >= 0 && (t = t.slice(0, n)), !t || 'start' === t;
              });
          })(n)
            ? Xe
            : Be;
        return function () {
          var a = o(this, t),
            u = a.on;
          u !== r && (i = (r = u).copy()).on(n, e), (a.on = i);
        };
      }
      var lr = St.prototype.constructor;
      function dr(t, n, e) {
        function r() {
          var r = this,
            i = n.apply(r, arguments);
          return (
            i &&
            function (n) {
              r.style.setProperty(t, i(n), e);
            }
          );
        }
        return (r._value = n), r;
      }
      var pr = 0;
      function vr(t, n, e, r) {
        (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
      }
      function _r() {
        return ++pr;
      }
      var yr = St.prototype;
      (vr.prototype = function (t) {
        return St().transition(t);
      }.prototype =
        {
          constructor: vr,
          select: function (t) {
            var n = this._name,
              e = this._id;
            'function' != typeof t && (t = M(t));
            for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a)
              for (var u, s, c = r[a], f = c.length, h = (o[a] = new Array(f)), l = 0; l < f; ++l)
                (u = c[l]) &&
                  (s = t.call(u, u.__data__, l, c)) &&
                  ('__data__' in u && (s.__data__ = u.__data__),
                  (h[l] = s),
                  He(h[l], n, e, l, h, $e(u, e)));
            return new vr(o, this._parents, n, e);
          },
          selectAll: function (t) {
            var n = this._name,
              e = this._id;
            'function' != typeof t && (t = N(t));
            for (var r = this._groups, i = r.length, o = [], a = [], u = 0; u < i; ++u)
              for (var s, c = r[u], f = c.length, h = 0; h < f; ++h)
                if ((s = c[h])) {
                  for (
                    var l, d = t.call(s, s.__data__, h, c), p = $e(s, e), v = 0, _ = d.length;
                    v < _;
                    ++v
                  )
                    (l = d[v]) && He(l, n, e, v, d, p);
                  o.push(d), a.push(s);
                }
            return new vr(o, a, n, e);
          },
          filter: function (t) {
            'function' != typeof t && (t = S(t));
            for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
              for (var o, a = n[i], u = a.length, s = (r[i] = []), c = 0; c < u; ++c)
                (o = a[c]) && t.call(o, o.__data__, c, a) && s.push(o);
            return new vr(r, this._parents, this._name, this._id);
          },
          merge: function (t) {
            if (t._id !== this._id) throw new Error();
            for (
              var n = this._groups,
                e = t._groups,
                r = n.length,
                i = e.length,
                o = Math.min(r, i),
                a = new Array(r),
                u = 0;
              u < o;
              ++u
            )
              for (
                var s, c = n[u], f = e[u], h = c.length, l = (a[u] = new Array(h)), d = 0;
                d < h;
                ++d
              )
                (s = c[d] || f[d]) && (l[d] = s);
            for (; u < r; ++u) a[u] = n[u];
            return new vr(a, this._parents, this._name, this._id);
          },
          selection: function () {
            return new lr(this._groups, this._parents);
          },
          transition: function () {
            for (
              var t = this._name, n = this._id, e = _r(), r = this._groups, i = r.length, o = 0;
              o < i;
              ++o
            )
              for (var a, u = r[o], s = u.length, c = 0; c < s; ++c)
                if ((a = u[c])) {
                  var f = $e(a, n);
                  He(a, t, e, c, u, {
                    time: f.time + f.delay + f.duration,
                    delay: 0,
                    duration: f.duration,
                    ease: f.ease,
                  });
                }
            return new vr(r, this._parents, t, e);
          },
          call: yr.call,
          nodes: yr.nodes,
          node: yr.node,
          size: yr.size,
          empty: yr.empty,
          each: yr.each,
          on: function (t, n) {
            var e = this._id;
            return arguments.length < 2 ? $e(this.node(), e).on.on(t) : this.each(hr(e, t, n));
          },
          attr: function (t, n) {
            var e = g(t),
              r = 'transform' === e ? ve : Qe;
            return this.attrTween(
              t,
              'function' == typeof n
                ? (e.local ? rr : er)(e, r, Je(this, 'attr.' + t, n))
                : null == n
                ? (e.local ? Ke : Ge)(e)
                : (e.local ? nr : tr)(e, r, n + '')
            );
          },
          attrTween: function (t, n) {
            var e = 'attr.' + t;
            if (arguments.length < 2) return (e = this.tween(e)) && e._value;
            if (null == n) return this.tween(e, null);
            if ('function' != typeof n) throw new Error();
            var r = g(t);
            return this.tween(e, (r.local ? ir : or)(r, n));
          },
          style: function (t, n, e) {
            var r = 'transform' == (t += '') ? pe : Qe;
            return null == n
              ? this.styleTween(
                  t,
                  (function (t, n) {
                    var e, r, i;
                    return function () {
                      var o = B(this, t),
                        a = (this.style.removeProperty(t), B(this, t));
                      return o === a ? null : o === e && a === r ? i : (i = n((e = o), (r = a)));
                    };
                  })(t, r)
                ).on(
                  'end.style.' + t,
                  (function (t) {
                    return function () {
                      this.style.removeProperty(t);
                    };
                  })(t)
                )
              : this.styleTween(
                  t,
                  'function' == typeof n
                    ? (function (t, n, e) {
                        var r, i, o;
                        return function () {
                          var a = B(this, t),
                            u = e(this);
                          return (
                            null == u && (this.style.removeProperty(t), (u = B(this, t))),
                            a === u ? null : a === r && u === i ? o : (o = n((r = a), (i = u)))
                          );
                        };
                      })(t, r, Je(this, 'style.' + t, n))
                    : (function (t, n, e) {
                        var r, i;
                        return function () {
                          var o = B(this, t);
                          return o === e ? null : o === r ? i : (i = n((r = o), e));
                        };
                      })(t, r, n + ''),
                  e
                );
          },
          styleTween: function (t, n, e) {
            var r = 'style.' + (t += '');
            if (arguments.length < 2) return (r = this.tween(r)) && r._value;
            if (null == n) return this.tween(r, null);
            if ('function' != typeof n) throw new Error();
            return this.tween(r, dr(t, n, null == e ? '' : e));
          },
          text: function (t) {
            return this.tween(
              'text',
              'function' == typeof t
                ? (function (t) {
                    return function () {
                      var n = t(this);
                      this.textContent = null == n ? '' : n;
                    };
                  })(Je(this, 'text', t))
                : (function (t) {
                    return function () {
                      this.textContent = t;
                    };
                  })(null == t ? '' : t + '')
            );
          },
          remove: function () {
            return this.on(
              'end.remove',
              (function (t) {
                return function () {
                  var n = this.parentNode;
                  for (var e in this.__transition) if (+e !== t) return;
                  n && n.removeChild(this);
                };
              })(this._id)
            );
          },
          tween: function (t, n) {
            var e = this._id;
            if (((t += ''), arguments.length < 2)) {
              for (var r, i = $e(this.node(), e).tween, o = 0, a = i.length; o < a; ++o)
                if ((r = i[o]).name === t) return r.value;
              return null;
            }
            return this.each((null == n ? Ve : Ze)(e, t, n));
          },
          delay: function (t) {
            var n = this._id;
            return arguments.length
              ? this.each(('function' == typeof t ? ar : ur)(n, t))
              : $e(this.node(), n).delay;
          },
          duration: function (t) {
            var n = this._id;
            return arguments.length
              ? this.each(('function' == typeof t ? sr : cr)(n, t))
              : $e(this.node(), n).duration;
          },
          ease: function (t) {
            var n = this._id;
            return arguments.length ? this.each(fr(n, t)) : $e(this.node(), n).ease;
          },
        }),
        (function t(n) {
          function e(t) {
            return Math.pow(t, n);
          }
          return (n = +n), (e.exponent = t), e;
        })(3),
        (function t(n) {
          function e(t) {
            return 1 - Math.pow(1 - t, n);
          }
          return (n = +n), (e.exponent = t), e;
        })(3),
        (function t(n) {
          function e(t) {
            return ((t *= 2) <= 1 ? Math.pow(t, n) : 2 - Math.pow(2 - t, n)) / 2;
          }
          return (n = +n), (e.exponent = t), e;
        })(3),
        Math.PI;
      var gr = 1.70158,
        mr =
          ((function t(n) {
            function e(t) {
              return t * t * ((n + 1) * t - n);
            }
            return (n = +n), (e.overshoot = t), e;
          })(gr),
          (function t(n) {
            function e(t) {
              return --t * t * ((n + 1) * t + n) + 1;
            }
            return (n = +n), (e.overshoot = t), e;
          })(gr),
          (function t(n) {
            function e(t) {
              return (
                ((t *= 2) < 1 ? t * t * ((n + 1) * t - n) : (t -= 2) * t * ((n + 1) * t + n) + 2) /
                2
              );
            }
            return (n = +n), (e.overshoot = t), e;
          })(gr),
          2 * Math.PI),
        br =
          ((function t(n, e) {
            var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= mr);
            function i(t) {
              return n * Math.pow(2, 10 * --t) * Math.sin((r - t) / e);
            }
            return (
              (i.amplitude = function (n) {
                return t(n, e * mr);
              }),
              (i.period = function (e) {
                return t(n, e);
              }),
              i
            );
          })(1, 0.3),
          (function t(n, e) {
            var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= mr);
            function i(t) {
              return 1 - n * Math.pow(2, -10 * (t = +t)) * Math.sin((t + r) / e);
            }
            return (
              (i.amplitude = function (n) {
                return t(n, e * mr);
              }),
              (i.period = function (e) {
                return t(n, e);
              }),
              i
            );
          })(1, 0.3),
          (function t(n, e) {
            var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= mr);
            function i(t) {
              return (
                ((t = 2 * t - 1) < 0
                  ? n * Math.pow(2, 10 * t) * Math.sin((r - t) / e)
                  : 2 - n * Math.pow(2, -10 * t) * Math.sin((r + t) / e)) / 2
              );
            }
            return (
              (i.amplitude = function (n) {
                return t(n, e * mr);
              }),
              (i.period = function (e) {
                return t(n, e);
              }),
              i
            );
          })(1, 0.3),
          {
            time: null,
            delay: 0,
            duration: 250,
            ease: function (t) {
              return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
            },
          });
      function wr(t, n) {
        for (var e; !(e = t.__transition) || !(e = e[n]); )
          if (!(t = t.parentNode)) return (br.time = Ue()), br;
        return e;
      }
      function xr(t) {
        return { type: t };
      }
      function Mr(t, n) {
        return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
      }
      (St.prototype.interrupt = function (t) {
        return this.each(function () {
          We(this, t);
        });
      }),
        (St.prototype.transition = function (t) {
          var n, e;
          t instanceof vr
            ? ((n = t._id), (t = t._name))
            : ((n = _r()), ((e = br).time = Ue()), (t = null == t ? null : t + ''));
          for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
            for (var a, u = r[o], s = u.length, c = 0; c < s; ++c)
              (a = u[c]) && He(a, t, n, c, u, e || wr(a, n));
          return new vr(r, this._parents, t, n);
        }),
        ['e', 'w'].map(xr),
        ['n', 's'].map(xr),
        ['n', 'e', 's', 'w', 'nw', 'ne', 'se', 'sw'].map(xr);
      var kr = (function (t) {
        return (
          1 === t.length &&
            (t = (function (t) {
              return function (n, e) {
                return Mr(t(n), e);
              };
            })(t)),
          {
            left: function (n, e, r, i) {
              for (null == r && (r = 0), null == i && (i = n.length); r < i; ) {
                var o = (r + i) >>> 1;
                t(n[o], e) < 0 ? (r = o + 1) : (i = o);
              }
              return r;
            },
            right: function (n, e, r, i) {
              for (null == r && (r = 0), null == i && (i = n.length); r < i; ) {
                var o = (r + i) >>> 1;
                t(n[o], e) > 0 ? (i = o) : (r = o + 1);
              }
              return r;
            },
          }
        );
      })(Mr);
      kr.right, kr.left;
      var Nr = Array.prototype;
      Nr.slice,
        Nr.map,
        Math.sqrt(50),
        Math.sqrt(10),
        Math.sqrt(2),
        Math.cos,
        Math.sin,
        Math.PI,
        Math.max,
        Array.prototype.slice;
      var Ar = Math.PI,
        Tr = 2 * Ar,
        Cr = 1e-6,
        Sr = Tr - Cr;
      function Er() {
        (this._x0 = this._y0 = this._x1 = this._y1 = null), (this._ = '');
      }
      Er.prototype = function () {
        return new Er();
      }.prototype = {
        constructor: Er,
        moveTo: function (t, n) {
          this._ += 'M' + (this._x0 = this._x1 = +t) + ',' + (this._y0 = this._y1 = +n);
        },
        closePath: function () {
          null !== this._x1 && ((this._x1 = this._x0), (this._y1 = this._y0), (this._ += 'Z'));
        },
        lineTo: function (t, n) {
          this._ += 'L' + (this._x1 = +t) + ',' + (this._y1 = +n);
        },
        quadraticCurveTo: function (t, n, e, r) {
          this._ += 'Q' + +t + ',' + +n + ',' + (this._x1 = +e) + ',' + (this._y1 = +r);
        },
        bezierCurveTo: function (t, n, e, r, i, o) {
          this._ +=
            'C' +
            +t +
            ',' +
            +n +
            ',' +
            +e +
            ',' +
            +r +
            ',' +
            (this._x1 = +i) +
            ',' +
            (this._y1 = +o);
        },
        arcTo: function (t, n, e, r, i) {
          (t = +t), (n = +n), (e = +e), (r = +r), (i = +i);
          var o = this._x1,
            a = this._y1,
            u = e - t,
            s = r - n,
            c = o - t,
            f = a - n,
            h = c * c + f * f;
          if (i < 0) throw new Error('negative radius: ' + i);
          if (null === this._x1) this._ += 'M' + (this._x1 = t) + ',' + (this._y1 = n);
          else if (h > Cr)
            if (Math.abs(f * u - s * c) > Cr && i) {
              var l = e - o,
                d = r - a,
                p = u * u + s * s,
                v = l * l + d * d,
                _ = Math.sqrt(p),
                y = Math.sqrt(h),
                g = i * Math.tan((Ar - Math.acos((p + h - v) / (2 * _ * y))) / 2),
                m = g / y,
                b = g / _;
              Math.abs(m - 1) > Cr && (this._ += 'L' + (t + m * c) + ',' + (n + m * f)),
                (this._ +=
                  'A' +
                  i +
                  ',' +
                  i +
                  ',0,0,' +
                  +(f * l > c * d) +
                  ',' +
                  (this._x1 = t + b * u) +
                  ',' +
                  (this._y1 = n + b * s));
            } else this._ += 'L' + (this._x1 = t) + ',' + (this._y1 = n);
        },
        arc: function (t, n, e, r, i, o) {
          (t = +t), (n = +n);
          var a = (e = +e) * Math.cos(r),
            u = e * Math.sin(r),
            s = t + a,
            c = n + u,
            f = 1 ^ o,
            h = o ? r - i : i - r;
          if (e < 0) throw new Error('negative radius: ' + e);
          null === this._x1
            ? (this._ += 'M' + s + ',' + c)
            : (Math.abs(this._x1 - s) > Cr || Math.abs(this._y1 - c) > Cr) &&
              (this._ += 'L' + s + ',' + c),
            e &&
              (h < 0 && (h = (h % Tr) + Tr),
              h > Sr
                ? (this._ +=
                    'A' +
                    e +
                    ',' +
                    e +
                    ',0,1,' +
                    f +
                    ',' +
                    (t - a) +
                    ',' +
                    (n - u) +
                    'A' +
                    e +
                    ',' +
                    e +
                    ',0,1,' +
                    f +
                    ',' +
                    (this._x1 = s) +
                    ',' +
                    (this._y1 = c))
                : h > Cr &&
                  (this._ +=
                    'A' +
                    e +
                    ',' +
                    e +
                    ',0,' +
                    +(h >= Ar) +
                    ',' +
                    f +
                    ',' +
                    (this._x1 = t + e * Math.cos(i)) +
                    ',' +
                    (this._y1 = n + e * Math.sin(i))));
        },
        rect: function (t, n, e, r) {
          this._ +=
            'M' +
            (this._x0 = this._x1 = +t) +
            ',' +
            (this._y0 = this._y1 = +n) +
            'h' +
            +e +
            'v' +
            +r +
            'h' +
            -e +
            'Z';
        },
        toString: function () {
          return this._;
        },
      };
      var Lr = '$';
      function zr() {}
      function Ur(t, n) {
        var e = new zr();
        if (t instanceof zr)
          t.each(function (t, n) {
            e.set(n, t);
          });
        else if (Array.isArray(t)) {
          var r,
            i = -1,
            o = t.length;
          if (null == n) for (; ++i < o; ) e.set(i, t[i]);
          else for (; ++i < o; ) e.set(n((r = t[i]), i, t), r);
        } else if (t) for (var a in t) e.set(a, t[a]);
        return e;
      }
      zr.prototype = Ur.prototype = {
        constructor: zr,
        has: function (t) {
          return Lr + t in this;
        },
        get: function (t) {
          return this[Lr + t];
        },
        set: function (t, n) {
          return (this[Lr + t] = n), this;
        },
        remove: function (t) {
          var n = Lr + t;
          return n in this && delete this[n];
        },
        clear: function () {
          for (var t in this) t[0] === Lr && delete this[t];
        },
        keys: function () {
          var t = [];
          for (var n in this) n[0] === Lr && t.push(n.slice(1));
          return t;
        },
        values: function () {
          var t = [];
          for (var n in this) n[0] === Lr && t.push(this[n]);
          return t;
        },
        entries: function () {
          var t = [];
          for (var n in this) n[0] === Lr && t.push({ key: n.slice(1), value: this[n] });
          return t;
        },
        size: function () {
          var t = 0;
          for (var n in this) n[0] === Lr && ++t;
          return t;
        },
        empty: function () {
          for (var t in this) if (t[0] === Lr) return !1;
          return !0;
        },
        each: function (t) {
          for (var n in this) n[0] === Lr && t(this[n], n.slice(1), this);
        },
      };
      const Pr = Ur;
      function Ir() {}
      var Dr = Pr.prototype;
      Ir.prototype = function (t, n) {
        var e = new Ir();
        if (t instanceof Ir)
          t.each(function (t) {
            e.add(t);
          });
        else if (t) {
          var r = -1,
            i = t.length;
          if (null == n) for (; ++r < i; ) e.add(t[r]);
          else for (; ++r < i; ) e.add(n(t[r], r, t));
        }
        return e;
      }.prototype = {
        constructor: Ir,
        has: Dr.has,
        add: function (t) {
          return (this[Lr + (t += '')] = t), this;
        },
        remove: Dr.remove,
        clear: Dr.clear,
        values: Dr.keys,
        size: Dr.size,
        empty: Dr.empty,
        each: Dr.each,
      };
      var jr = {},
        Rr = {};
      function Or(t) {
        return new Function(
          'd',
          'return {' +
            t
              .map(function (t, n) {
                return JSON.stringify(t) + ': d[' + n + ']';
              })
              .join(',') +
            '}'
        );
      }
      function qr(t) {
        var n = new RegExp('["' + t + '\n\r]'),
          e = t.charCodeAt(0);
        function r(t, n) {
          var r,
            i = [],
            o = t.length,
            a = 0,
            u = 0,
            s = o <= 0,
            c = !1;
          function f() {
            if (s) return Rr;
            if (c) return (c = !1), jr;
            var n,
              r,
              i = a;
            if (34 === t.charCodeAt(i)) {
              for (; (a++ < o && 34 !== t.charCodeAt(a)) || 34 === t.charCodeAt(++a); );
              return (
                (n = a) >= o
                  ? (s = !0)
                  : 10 === (r = t.charCodeAt(a++))
                  ? (c = !0)
                  : 13 === r && ((c = !0), 10 === t.charCodeAt(a) && ++a),
                t.slice(i + 1, n - 1).replace(/""/g, '"')
              );
            }
            for (; a < o; ) {
              if (10 === (r = t.charCodeAt((n = a++)))) c = !0;
              else if (13 === r) (c = !0), 10 === t.charCodeAt(a) && ++a;
              else if (r !== e) continue;
              return t.slice(i, n);
            }
            return (s = !0), t.slice(i, o);
          }
          for (
            10 === t.charCodeAt(o - 1) && --o, 13 === t.charCodeAt(o - 1) && --o;
            (r = f()) !== Rr;

          ) {
            for (var h = []; r !== jr && r !== Rr; ) h.push(r), (r = f());
            (n && null == (h = n(h, u++))) || i.push(h);
          }
          return i;
        }
        function i(n) {
          return n.map(o).join(t);
        }
        function o(t) {
          return null == t ? '' : n.test((t += '')) ? '"' + t.replace(/"/g, '""') + '"' : t;
        }
        return {
          parse: function (t, n) {
            var e,
              i,
              o = r(t, function (t, r) {
                if (e) return e(t, r - 1);
                (i = t),
                  (e = n
                    ? (function (t, n) {
                        var e = Or(t);
                        return function (r, i) {
                          return n(e(r), i, t);
                        };
                      })(t, n)
                    : Or(t));
              });
            return (o.columns = i || []), o;
          },
          parseRows: r,
          format: function (n, e) {
            return (
              null == e &&
                (e = (function (t) {
                  var n = Object.create(null),
                    e = [];
                  return (
                    t.forEach(function (t) {
                      for (var r in t) r in n || e.push((n[r] = r));
                    }),
                    e
                  );
                })(n)),
              [e.map(o).join(t)]
                .concat(
                  n.map(function (n) {
                    return e
                      .map(function (t) {
                        return o(n[t]);
                      })
                      .join(t);
                  })
                )
                .join('\n')
            );
          },
          formatRows: function (t) {
            return t.map(i).join('\n');
          },
        };
      }
      var Fr = qr(','),
        Yr = Fr.parse,
        Hr = (Fr.parseRows, Fr.format, Fr.formatRows, qr('\t')),
        Xr = Hr.parse;
      function Br(t, n, e, r) {
        if (isNaN(n) || isNaN(e)) return t;
        var i,
          o,
          a,
          u,
          s,
          c,
          f,
          h,
          l,
          d = t._root,
          p = { data: r },
          v = t._x0,
          _ = t._y0,
          y = t._x1,
          g = t._y1;
        if (!d) return (t._root = p), t;
        for (; d.length; )
          if (
            ((c = n >= (o = (v + y) / 2)) ? (v = o) : (y = o),
            (f = e >= (a = (_ + g) / 2)) ? (_ = a) : (g = a),
            (i = d),
            !(d = d[(h = (f << 1) | c)]))
          )
            return (i[h] = p), t;
        if (((u = +t._x.call(null, d.data)), (s = +t._y.call(null, d.data)), n === u && e === s))
          return (p.next = d), i ? (i[h] = p) : (t._root = p), t;
        do {
          (i = i ? (i[h] = new Array(4)) : (t._root = new Array(4))),
            (c = n >= (o = (v + y) / 2)) ? (v = o) : (y = o),
            (f = e >= (a = (_ + g) / 2)) ? (_ = a) : (g = a);
        } while ((h = (f << 1) | c) == (l = ((s >= a) << 1) | (u >= o)));
        return (i[l] = d), (i[h] = p), t;
      }
      function $r(t, n, e, r, i) {
        (this.node = t), (this.x0 = n), (this.y0 = e), (this.x1 = r), (this.y1 = i);
      }
      function Wr(t) {
        return t[0];
      }
      function Vr(t) {
        return t[1];
      }
      function Zr(t, n, e) {
        var r = new Jr(null == n ? Wr : n, null == e ? Vr : e, NaN, NaN, NaN, NaN);
        return null == t ? r : r.addAll(t);
      }
      function Jr(t, n, e, r, i, o) {
        (this._x = t),
          (this._y = n),
          (this._x0 = e),
          (this._y0 = r),
          (this._x1 = i),
          (this._y1 = o),
          (this._root = void 0);
      }
      function Qr(t) {
        for (var n = { data: t.data }, e = n; (t = t.next); ) e = e.next = { data: t.data };
        return n;
      }
      Hr.parseRows, Hr.format, Hr.formatRows;
      var Gr = (Zr.prototype = Jr.prototype);
      function Kr(t) {
        return function () {
          return t;
        };
      }
      function ti() {
        return 1e-6 * (Math.random() - 0.5);
      }
      function ni(t) {
        return t.index;
      }
      function ei(t, n) {
        var e = t.get(n);
        if (!e) throw new Error('missing: ' + n);
        return e;
      }
      function ri(t) {
        return t.x;
      }
      function ii(t) {
        return t.y;
      }
      (Gr.copy = function () {
        var t,
          n,
          e = new Jr(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
          r = this._root;
        if (!r) return e;
        if (!r.length) return (e._root = Qr(r)), e;
        for (t = [{ source: r, target: (e._root = new Array(4)) }]; (r = t.pop()); )
          for (var i = 0; i < 4; ++i)
            (n = r.source[i]) &&
              (n.length
                ? t.push({ source: n, target: (r.target[i] = new Array(4)) })
                : (r.target[i] = Qr(n)));
        return e;
      }),
        (Gr.add = function (t) {
          var n = +this._x.call(null, t),
            e = +this._y.call(null, t);
          return Br(this.cover(n, e), n, e, t);
        }),
        (Gr.addAll = function (t) {
          var n,
            e,
            r,
            i,
            o = t.length,
            a = new Array(o),
            u = new Array(o),
            s = 1 / 0,
            c = 1 / 0,
            f = -1 / 0,
            h = -1 / 0;
          for (e = 0; e < o; ++e)
            isNaN((r = +this._x.call(null, (n = t[e])))) ||
              isNaN((i = +this._y.call(null, n))) ||
              ((a[e] = r),
              (u[e] = i),
              r < s && (s = r),
              r > f && (f = r),
              i < c && (c = i),
              i > h && (h = i));
          for (
            f < s && ((s = this._x0), (f = this._x1)),
              h < c && ((c = this._y0), (h = this._y1)),
              this.cover(s, c).cover(f, h),
              e = 0;
            e < o;
            ++e
          )
            Br(this, a[e], u[e], t[e]);
          return this;
        }),
        (Gr.cover = function (t, n) {
          if (isNaN((t = +t)) || isNaN((n = +n))) return this;
          var e = this._x0,
            r = this._y0,
            i = this._x1,
            o = this._y1;
          if (isNaN(e)) (i = (e = Math.floor(t)) + 1), (o = (r = Math.floor(n)) + 1);
          else {
            if (!(e > t || t > i || r > n || n > o)) return this;
            var a,
              u,
              s = i - e,
              c = this._root;
            switch ((u = ((n < (r + o) / 2) << 1) | (t < (e + i) / 2))) {
              case 0:
                do {
                  ((a = new Array(4))[u] = c), (c = a);
                } while (((o = r + (s *= 2)), t > (i = e + s) || n > o));
                break;
              case 1:
                do {
                  ((a = new Array(4))[u] = c), (c = a);
                } while (((o = r + (s *= 2)), (e = i - s) > t || n > o));
                break;
              case 2:
                do {
                  ((a = new Array(4))[u] = c), (c = a);
                } while (((r = o - (s *= 2)), t > (i = e + s) || r > n));
                break;
              case 3:
                do {
                  ((a = new Array(4))[u] = c), (c = a);
                } while (((r = o - (s *= 2)), (e = i - s) > t || r > n));
            }
            this._root && this._root.length && (this._root = c);
          }
          return (this._x0 = e), (this._y0 = r), (this._x1 = i), (this._y1 = o), this;
        }),
        (Gr.data = function () {
          var t = [];
          return (
            this.visit(function (n) {
              if (!n.length)
                do {
                  t.push(n.data);
                } while ((n = n.next));
            }),
            t
          );
        }),
        (Gr.extent = function (t) {
          return arguments.length
            ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1])
            : isNaN(this._x0)
            ? void 0
            : [
                [this._x0, this._y0],
                [this._x1, this._y1],
              ];
        }),
        (Gr.find = function (t, n, e) {
          var r,
            i,
            o,
            a,
            u,
            s,
            c,
            f = this._x0,
            h = this._y0,
            l = this._x1,
            d = this._y1,
            p = [],
            v = this._root;
          for (
            v && p.push(new $r(v, f, h, l, d)),
              null == e
                ? (e = 1 / 0)
                : ((f = t - e), (h = n - e), (l = t + e), (d = n + e), (e *= e));
            (s = p.pop());

          )
            if (
              !(
                !(v = s.node) ||
                (i = s.x0) > l ||
                (o = s.y0) > d ||
                (a = s.x1) < f ||
                (u = s.y1) < h
              )
            )
              if (v.length) {
                var _ = (i + a) / 2,
                  y = (o + u) / 2;
                p.push(
                  new $r(v[3], _, y, a, u),
                  new $r(v[2], i, y, _, u),
                  new $r(v[1], _, o, a, y),
                  new $r(v[0], i, o, _, y)
                ),
                  (c = ((n >= y) << 1) | (t >= _)) &&
                    ((s = p[p.length - 1]),
                    (p[p.length - 1] = p[p.length - 1 - c]),
                    (p[p.length - 1 - c] = s));
              } else {
                var g = t - +this._x.call(null, v.data),
                  m = n - +this._y.call(null, v.data),
                  b = g * g + m * m;
                if (b < e) {
                  var w = Math.sqrt((e = b));
                  (f = t - w), (h = n - w), (l = t + w), (d = n + w), (r = v.data);
                }
              }
          return r;
        }),
        (Gr.remove = function (t) {
          if (isNaN((o = +this._x.call(null, t))) || isNaN((a = +this._y.call(null, t))))
            return this;
          var n,
            e,
            r,
            i,
            o,
            a,
            u,
            s,
            c,
            f,
            h,
            l,
            d = this._root,
            p = this._x0,
            v = this._y0,
            _ = this._x1,
            y = this._y1;
          if (!d) return this;
          if (d.length)
            for (;;) {
              if (
                ((c = o >= (u = (p + _) / 2)) ? (p = u) : (_ = u),
                (f = a >= (s = (v + y) / 2)) ? (v = s) : (y = s),
                (n = d),
                !(d = d[(h = (f << 1) | c)]))
              )
                return this;
              if (!d.length) break;
              (n[(h + 1) & 3] || n[(h + 2) & 3] || n[(h + 3) & 3]) && ((e = n), (l = h));
            }
          for (; d.data !== t; ) if (((r = d), !(d = d.next))) return this;
          return (
            (i = d.next) && delete d.next,
            r
              ? (i ? (r.next = i) : delete r.next, this)
              : n
              ? (i ? (n[h] = i) : delete n[h],
                (d = n[0] || n[1] || n[2] || n[3]) &&
                  d === (n[3] || n[2] || n[1] || n[0]) &&
                  !d.length &&
                  (e ? (e[l] = d) : (this._root = d)),
                this)
              : ((this._root = i), this)
          );
        }),
        (Gr.removeAll = function (t) {
          for (var n = 0, e = t.length; n < e; ++n) this.remove(t[n]);
          return this;
        }),
        (Gr.root = function () {
          return this._root;
        }),
        (Gr.size = function () {
          var t = 0;
          return (
            this.visit(function (n) {
              if (!n.length)
                do {
                  ++t;
                } while ((n = n.next));
            }),
            t
          );
        }),
        (Gr.visit = function (t) {
          var n,
            e,
            r,
            i,
            o,
            a,
            u = [],
            s = this._root;
          for (s && u.push(new $r(s, this._x0, this._y0, this._x1, this._y1)); (n = u.pop()); )
            if (!t((s = n.node), (r = n.x0), (i = n.y0), (o = n.x1), (a = n.y1)) && s.length) {
              var c = (r + o) / 2,
                f = (i + a) / 2;
              (e = s[3]) && u.push(new $r(e, c, f, o, a)),
                (e = s[2]) && u.push(new $r(e, r, f, c, a)),
                (e = s[1]) && u.push(new $r(e, c, i, o, f)),
                (e = s[0]) && u.push(new $r(e, r, i, c, f));
            }
          return this;
        }),
        (Gr.visitAfter = function (t) {
          var n,
            e = [],
            r = [];
          for (
            this._root && e.push(new $r(this._root, this._x0, this._y0, this._x1, this._y1));
            (n = e.pop());

          ) {
            var i = n.node;
            if (i.length) {
              var o,
                a = n.x0,
                u = n.y0,
                s = n.x1,
                c = n.y1,
                f = (a + s) / 2,
                h = (u + c) / 2;
              (o = i[0]) && e.push(new $r(o, a, u, f, h)),
                (o = i[1]) && e.push(new $r(o, f, u, s, h)),
                (o = i[2]) && e.push(new $r(o, a, h, f, c)),
                (o = i[3]) && e.push(new $r(o, f, h, s, c));
            }
            r.push(n);
          }
          for (; (n = r.pop()); ) t(n.node, n.x0, n.y0, n.x1, n.y1);
          return this;
        }),
        (Gr.x = function (t) {
          return arguments.length ? ((this._x = t), this) : this._x;
        }),
        (Gr.y = function (t) {
          return arguments.length ? ((this._y = t), this) : this._y;
        });
      var oi,
        ai = Math.PI * (3 - Math.sqrt(5));
      function ui(t, n) {
        if ((e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf('e')) < 0)
          return null;
        var e,
          r = t.slice(0, e);
        return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(e + 1)];
      }
      function si(t, n) {
        var e = ui(t, n);
        if (!e) return t + '';
        var r = e[0],
          i = e[1];
        return i < 0
          ? '0.' + new Array(-i).join('0') + r
          : r.length > i + 1
          ? r.slice(0, i + 1) + '.' + r.slice(i + 1)
          : r + new Array(i - r.length + 2).join('0');
      }
      const ci = {
        '': function (t, n) {
          t: for (var e, r = (t = t.toPrecision(n)).length, i = 1, o = -1; i < r; ++i)
            switch (t[i]) {
              case '.':
                o = e = i;
                break;
              case '0':
                0 === o && (o = i), (e = i);
                break;
              case 'e':
                break t;
              default:
                o > 0 && (o = 0);
            }
          return o > 0 ? t.slice(0, o) + t.slice(e + 1) : t;
        },
        '%': function (t, n) {
          return (100 * t).toFixed(n);
        },
        b: function (t) {
          return Math.round(t).toString(2);
        },
        c: function (t) {
          return t + '';
        },
        d: function (t) {
          return Math.round(t).toString(10);
        },
        e: function (t, n) {
          return t.toExponential(n);
        },
        f: function (t, n) {
          return t.toFixed(n);
        },
        g: function (t, n) {
          return t.toPrecision(n);
        },
        o: function (t) {
          return Math.round(t).toString(8);
        },
        p: function (t, n) {
          return si(100 * t, n);
        },
        r: si,
        s: function (t, n) {
          var e = ui(t, n);
          if (!e) return t + '';
          var r = e[0],
            i = e[1],
            o = i - (oi = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
            a = r.length;
          return o === a
            ? r
            : o > a
            ? r + new Array(o - a + 1).join('0')
            : o > 0
            ? r.slice(0, o) + '.' + r.slice(o)
            : '0.' + new Array(1 - o).join('0') + ui(t, Math.max(0, n + o - 1))[0];
        },
        X: function (t) {
          return Math.round(t).toString(16).toUpperCase();
        },
        x: function (t) {
          return Math.round(t).toString(16);
        },
      };
      var fi = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;
      function hi(t) {
        return new li(t);
      }
      function li(t) {
        if (!(n = fi.exec(t))) throw new Error('invalid format: ' + t);
        var n,
          e = n[1] || ' ',
          r = n[2] || '>',
          i = n[3] || '-',
          o = n[4] || '',
          a = !!n[5],
          u = n[6] && +n[6],
          s = !!n[7],
          c = n[8] && +n[8].slice(1),
          f = n[9] || '';
        'n' === f ? ((s = !0), (f = 'g')) : ci[f] || (f = ''),
          (a || ('0' === e && '=' === r)) && ((a = !0), (e = '0'), (r = '=')),
          (this.fill = e),
          (this.align = r),
          (this.sign = i),
          (this.symbol = o),
          (this.zero = a),
          (this.width = u),
          (this.comma = s),
          (this.precision = c),
          (this.type = f);
      }
      function di(t) {
        return t;
      }
      (hi.prototype = li.prototype),
        (li.prototype.toString = function () {
          return (
            this.fill +
            this.align +
            this.sign +
            this.symbol +
            (this.zero ? '0' : '') +
            (null == this.width ? '' : Math.max(1, 0 | this.width)) +
            (this.comma ? ',' : '') +
            (null == this.precision ? '' : '.' + Math.max(0, 0 | this.precision)) +
            this.type
          );
        });
      var pi,
        vi = ['y', 'z', 'a', 'f', 'p', 'n', 'µ', 'm', '', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
      function _i() {
        return new yi();
      }
      function yi() {
        this.reset();
      }
      (pi = (function (t) {
        var n,
          e,
          r =
            t.grouping && t.thousands
              ? ((n = t.grouping),
                (e = t.thousands),
                function (t, r) {
                  for (
                    var i = t.length, o = [], a = 0, u = n[0], s = 0;
                    i > 0 &&
                    u > 0 &&
                    (s + u + 1 > r && (u = Math.max(1, r - s)),
                    o.push(t.substring((i -= u), i + u)),
                    !((s += u + 1) > r));

                  )
                    u = n[(a = (a + 1) % n.length)];
                  return o.reverse().join(e);
                })
              : di,
          i = t.currency,
          o = t.decimal,
          a = t.numerals
            ? (function (t) {
                return function (n) {
                  return n.replace(/[0-9]/g, function (n) {
                    return t[+n];
                  });
                };
              })(t.numerals)
            : di,
          u = t.percent || '%';
        function s(t) {
          var n = (t = hi(t)).fill,
            e = t.align,
            s = t.sign,
            c = t.symbol,
            f = t.zero,
            h = t.width,
            l = t.comma,
            d = t.precision,
            p = t.type,
            v = '$' === c ? i[0] : '#' === c && /[boxX]/.test(p) ? '0' + p.toLowerCase() : '',
            _ = '$' === c ? i[1] : /[%p]/.test(p) ? u : '',
            y = ci[p],
            g = !p || /[defgprs%]/.test(p);
          function m(t) {
            var i,
              u,
              c,
              m = v,
              b = _;
            if ('c' === p) (b = y(t) + b), (t = '');
            else {
              var w = (t = +t) < 0;
              if (
                ((t = y(Math.abs(t), d)),
                w && 0 == +t && (w = !1),
                (m = (w ? ('(' === s ? s : '-') : '-' === s || '(' === s ? '' : s) + m),
                (b = ('s' === p ? vi[8 + oi / 3] : '') + b + (w && '(' === s ? ')' : '')),
                g)
              )
                for (i = -1, u = t.length; ++i < u; )
                  if (48 > (c = t.charCodeAt(i)) || c > 57) {
                    (b = (46 === c ? o + t.slice(i + 1) : t.slice(i)) + b), (t = t.slice(0, i));
                    break;
                  }
            }
            l && !f && (t = r(t, 1 / 0));
            var x = m.length + t.length + b.length,
              M = x < h ? new Array(h - x + 1).join(n) : '';
            switch ((l && f && ((t = r(M + t, M.length ? h - b.length : 1 / 0)), (M = '')), e)) {
              case '<':
                t = m + t + b + M;
                break;
              case '=':
                t = m + M + t + b;
                break;
              case '^':
                t = M.slice(0, (x = M.length >> 1)) + m + t + b + M.slice(x);
                break;
              default:
                t = M + m + t + b;
            }
            return a(t);
          }
          return (
            (d =
              null == d
                ? p
                  ? 6
                  : 12
                : /[gprs]/.test(p)
                ? Math.max(1, Math.min(21, d))
                : Math.max(0, Math.min(20, d))),
            (m.toString = function () {
              return t + '';
            }),
            m
          );
        }
        return {
          format: s,
          formatPrefix: function (t, n) {
            var e,
              r = s((((t = hi(t)).type = 'f'), t)),
              i =
                3 *
                Math.max(
                  -8,
                  Math.min(8, Math.floor(((e = n), ((e = ui(Math.abs(e))) ? e[1] : NaN) / 3)))
                ),
              o = Math.pow(10, -i),
              a = vi[8 + i / 3];
            return function (t) {
              return r(o * t) + a;
            };
          },
        };
      })({ decimal: '.', thousands: ',', grouping: [3], currency: ['$', ''] })),
        pi.format,
        pi.formatPrefix,
        (yi.prototype = {
          constructor: yi,
          reset: function () {
            this.s = this.t = 0;
          },
          add: function (t) {
            mi(gi, t, this.t), mi(this, gi.s, this.s), this.s ? (this.t += gi.t) : (this.s = gi.t);
          },
          valueOf: function () {
            return this.s;
          },
        });
      var gi = new yi();
      function mi(t, n, e) {
        var r = (t.s = n + e),
          i = r - n,
          o = r - i;
        t.t = n - o + (e - i);
      }
      var bi = Math.PI,
        wi = bi / 2,
        xi = 2 * bi,
        Mi = bi / 180,
        ki = (Math.abs, Math.atan),
        Ni = Math.atan2,
        Ai = Math.cos,
        Ti = (Math.ceil, Math.exp, Math.floor, Math.log, Math.pow, Math.sin),
        Ci = (Math.sign, Math.sqrt);
      Math.tan;
      function Si(t) {
        return t > 1 ? wi : t < -1 ? -wi : Math.asin(t);
      }
      function Ei(t, n) {
        return [t > bi ? t - xi : t < -bi ? t + xi : t, n];
      }
      _i(), _i(), _i(), (Ei.invert = Ei);
      _i();
      function Li(t, n) {
        return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
      }
      var zi = (function (t) {
        return (
          1 === t.length &&
            (t = (function (t) {
              return function (n, e) {
                return Li(t(n), e);
              };
            })(t)),
          {
            left: function (n, e, r, i) {
              for (null == r && (r = 0), null == i && (i = n.length); r < i; ) {
                var o = (r + i) >>> 1;
                t(n[o], e) < 0 ? (r = o + 1) : (i = o);
              }
              return r;
            },
            right: function (n, e, r, i) {
              for (null == r && (r = 0), null == i && (i = n.length); r < i; ) {
                var o = (r + i) >>> 1;
                t(n[o], e) > 0 ? (i = o) : (r = o + 1);
              }
              return r;
            },
          }
        );
      })(Li);
      zi.right, zi.left;
      var Ui = Array.prototype;
      function Pi() {}
      function Ii(t) {
        return function (n, e) {
          var r = Ai(n),
            i = Ai(e),
            o = t(r * i);
          return [o * i * Ti(n), o * Ti(e)];
        };
      }
      function Di(t) {
        return function (n, e) {
          var r = Ci(n * n + e * e),
            i = t(r),
            o = Ti(i),
            a = Ai(i);
          return [Ni(n * o, r * a), Si(r && (e * o) / r)];
        };
      }
      function ji(t, n) {
        return [t, n];
      }
      function Ri(t) {
        var n = 0,
          e = t.children,
          r = e && e.length;
        if (r) for (; --r >= 0; ) n += e[r].value;
        else n = 1;
        t.value = n;
      }
      function Oi(t, n) {
        var e,
          r,
          i,
          o,
          a,
          u = new Hi(t),
          s = +t.value && (u.value = t.value),
          c = [u];
        for (null == n && (n = qi); (e = c.pop()); )
          if ((s && (e.value = +e.data.value), (i = n(e.data)) && (a = i.length)))
            for (e.children = new Array(a), o = a - 1; o >= 0; --o)
              c.push((r = e.children[o] = new Hi(i[o]))), (r.parent = e), (r.depth = e.depth + 1);
        return u.eachBefore(Yi);
      }
      function qi(t) {
        return t.children;
      }
      function Fi(t) {
        t.data = t.data.data;
      }
      function Yi(t) {
        var n = 0;
        do {
          t.height = n;
        } while ((t = t.parent) && t.height < ++n);
      }
      function Hi(t) {
        (this.data = t), (this.depth = this.height = 0), (this.parent = null);
      }
      function Xi(t, n, e, r, i) {
        for (
          var o, a = t.children, u = -1, s = a.length, c = t.value && (r - n) / t.value;
          ++u < s;

        )
          ((o = a[u]).y0 = e), (o.y1 = i), (o.x0 = n), (o.x1 = n += o.value * c);
      }
      function Bi(t, n, e, r, i) {
        for (
          var o, a = t.children, u = -1, s = a.length, c = t.value && (i - e) / t.value;
          ++u < s;

        )
          ((o = a[u]).x0 = n), (o.x1 = r), (o.y0 = e), (o.y1 = e += o.value * c);
      }
      Ui.slice,
        Ui.map,
        Math.sqrt(50),
        Math.sqrt(10),
        Math.sqrt(2),
        _i(),
        _i(),
        _i(),
        _i(),
        (Pi.prototype = {
          constructor: Pi,
          point: function (t, n) {
            this.stream.point(t, n);
          },
          sphere: function () {
            this.stream.sphere();
          },
          lineStart: function () {
            this.stream.lineStart();
          },
          lineEnd: function () {
            this.stream.lineEnd();
          },
          polygonStart: function () {
            this.stream.polygonStart();
          },
          polygonEnd: function () {
            this.stream.polygonEnd();
          },
        }),
        Ai(30 * Mi),
        (Ii(function (t) {
          return Ci(2 / (1 + t));
        }).invert = Di(function (t) {
          return 2 * Si(t / 2);
        })),
        (Ii(function (t) {
          return (t = (n = t) > 1 ? 0 : n < -1 ? bi : Math.acos(n)) && t / Ti(t);
          var n;
        }).invert = Di(function (t) {
          return t;
        })),
        (ji.invert = ji),
        Di(ki),
        Di(Si),
        Di(function (t) {
          return 2 * ki(t);
        }),
        (Hi.prototype = Oi.prototype =
          {
            constructor: Hi,
            count: function () {
              return this.eachAfter(Ri);
            },
            each: function (t) {
              var n,
                e,
                r,
                i,
                o = this,
                a = [o];
              do {
                for (n = a.reverse(), a = []; (o = n.pop()); )
                  if ((t(o), (e = o.children))) for (r = 0, i = e.length; r < i; ++r) a.push(e[r]);
              } while (a.length);
              return this;
            },
            eachAfter: function (t) {
              for (var n, e, r, i = this, o = [i], a = []; (i = o.pop()); )
                if ((a.push(i), (n = i.children)))
                  for (e = 0, r = n.length; e < r; ++e) o.push(n[e]);
              for (; (i = a.pop()); ) t(i);
              return this;
            },
            eachBefore: function (t) {
              for (var n, e, r = this, i = [r]; (r = i.pop()); )
                if ((t(r), (n = r.children))) for (e = n.length - 1; e >= 0; --e) i.push(n[e]);
              return this;
            },
            sum: function (t) {
              return this.eachAfter(function (n) {
                for (var e = +t(n.data) || 0, r = n.children, i = r && r.length; --i >= 0; )
                  e += r[i].value;
                n.value = e;
              });
            },
            sort: function (t) {
              return this.eachBefore(function (n) {
                n.children && n.children.sort(t);
              });
            },
            path: function (t) {
              for (
                var n = this,
                  e = (function (t, n) {
                    if (t === n) return t;
                    var e = t.ancestors(),
                      r = n.ancestors(),
                      i = null;
                    for (t = e.pop(), n = r.pop(); t === n; ) (i = t), (t = e.pop()), (n = r.pop());
                    return i;
                  })(n, t),
                  r = [n];
                n !== e;

              )
                (n = n.parent), r.push(n);
              for (var i = r.length; t !== e; ) r.splice(i, 0, t), (t = t.parent);
              return r;
            },
            ancestors: function () {
              for (var t = this, n = [t]; (t = t.parent); ) n.push(t);
              return n;
            },
            descendants: function () {
              var t = [];
              return (
                this.each(function (n) {
                  t.push(n);
                }),
                t
              );
            },
            leaves: function () {
              var t = [];
              return (
                this.eachBefore(function (n) {
                  n.children || t.push(n);
                }),
                t
              );
            },
            links: function () {
              var t = this,
                n = [];
              return (
                t.each(function (e) {
                  e !== t && n.push({ source: e.parent, target: e });
                }),
                n
              );
            },
            copy: function () {
              return Oi(this).eachBefore(Fi);
            },
          }),
        Array.prototype.slice,
        Object.create(Hi.prototype);
      var $i = (1 + Math.sqrt(5)) / 2;
      function Wi(t, n, e, r, i, o) {
        for (
          var a,
            u,
            s,
            c,
            f,
            h,
            l,
            d,
            p,
            v,
            _,
            y = [],
            g = n.children,
            m = 0,
            b = 0,
            w = g.length,
            x = n.value;
          m < w;

        ) {
          (s = i - e), (c = o - r);
          do {
            f = g[b++].value;
          } while (!f && b < w);
          for (
            h = l = f,
              _ = f * f * (v = Math.max(c / s, s / c) / (x * t)),
              p = Math.max(l / _, _ / h);
            b < w;
            ++b
          ) {
            if (
              ((f += u = g[b].value),
              u < h && (h = u),
              u > l && (l = u),
              (_ = f * f * v),
              (d = Math.max(l / _, _ / h)) > p)
            ) {
              f -= u;
              break;
            }
            p = d;
          }
          y.push((a = { value: f, dice: s < c, children: g.slice(m, b) })),
            a.dice
              ? Xi(a, e, r, i, x ? (r += (c * f) / x) : o)
              : Bi(a, e, r, x ? (e += (s * f) / x) : i, o),
            (x -= f),
            (m = b);
        }
        return y;
      }
      !(function t(n) {
        function e(t, e, r, i, o) {
          Wi(n, t, e, r, i, o);
        }
        return (
          (e.ratio = function (n) {
            return t((n = +n) > 1 ? n : 1);
          }),
          e
        );
      })($i),
        (function t(n) {
          function e(t, e, r, i, o) {
            if ((a = t._squarify) && a.ratio === n)
              for (var a, u, s, c, f, h = -1, l = a.length, d = t.value; ++h < l; ) {
                for (s = (u = a[h]).children, c = u.value = 0, f = s.length; c < f; ++c)
                  u.value += s[c].value;
                u.dice
                  ? Xi(u, e, r, i, (r += ((o - r) * u.value) / d))
                  : Bi(u, e, r, (e += ((i - e) * u.value) / d), o),
                  (d -= u.value);
              }
            else (t._squarify = a = Wi(n, t, e, r, i, o)), (a.ratio = n);
          }
          return (
            (e.ratio = function (n) {
              return t((n = +n) > 1 ? n : 1);
            }),
            e
          );
        })($i);
      var Vi = [].slice,
        Zi = {};
      function Ji(t) {
        (this._size = t),
          (this._call = this._error = null),
          (this._tasks = []),
          (this._data = []),
          (this._waiting = this._active = this._ended = this._start = 0);
      }
      function Qi(t) {
        if (!t._start)
          try {
            !(function (t) {
              for (; (t._start = t._waiting && t._active < t._size); ) {
                var n = t._ended + t._active,
                  e = t._tasks[n],
                  r = e.length - 1,
                  i = e[r];
                (e[r] = Gi(t, n)),
                  --t._waiting,
                  ++t._active,
                  (e = i.apply(null, e)),
                  t._tasks[n] && (t._tasks[n] = e || Zi);
              }
            })(t);
          } catch (n) {
            if (t._tasks[t._ended + t._active - 1]) Ki(t, n);
            else if (!t._data) throw n;
          }
      }
      function Gi(t, n) {
        return function (e, r) {
          t._tasks[n] &&
            (--t._active,
            ++t._ended,
            (t._tasks[n] = null),
            null == t._error &&
              (null != e ? Ki(t, e) : ((t._data[n] = r), t._waiting ? Qi(t) : to(t))));
        };
      }
      function Ki(t, n) {
        var e,
          r = t._tasks.length;
        for (t._error = n, t._data = void 0, t._waiting = NaN; --r >= 0; )
          if ((e = t._tasks[r]) && ((t._tasks[r] = null), e.abort))
            try {
              e.abort();
            } catch (n) {}
        (t._active = NaN), to(t);
      }
      function to(t) {
        if (!t._active && t._call) {
          var n = t._data;
          (t._data = void 0), t._call(t._error, n);
        }
      }
      function no() {
        return Math.random();
      }
      (Ji.prototype = function (t) {
        if (null == t) t = 1 / 0;
        else if (!((t = +t) >= 1)) throw new Error('invalid concurrency');
        return new Ji(t);
      }.prototype =
        {
          constructor: Ji,
          defer: function (t) {
            if ('function' != typeof t) throw new Error('invalid callback');
            if (this._call) throw new Error('defer after await');
            if (null != this._error) return this;
            var n = Vi.call(arguments, 1);
            return n.push(t), ++this._waiting, this._tasks.push(n), Qi(this), this;
          },
          abort: function () {
            return null == this._error && Ki(this, new Error('abort')), this;
          },
          await: function (t) {
            if ('function' != typeof t) throw new Error('invalid callback');
            if (this._call) throw new Error('multiple await');
            return (
              (this._call = function (n, e) {
                t.apply(null, [n].concat(e));
              }),
              to(this),
              this
            );
          },
          awaitAll: function (t) {
            if ('function' != typeof t) throw new Error('invalid callback');
            if (this._call) throw new Error('multiple await');
            return (this._call = t), to(this), this;
          },
        }),
        (function t(n) {
          function e(t, e) {
            return (
              (t = null == t ? 0 : +t),
              (e = null == e ? 1 : +e),
              1 === arguments.length ? ((e = t), (t = 0)) : (e -= t),
              function () {
                return n() * e + t;
              }
            );
          }
          return (e.source = t), e;
        })(no);
      const eo = (function t(n) {
          function e(t, e) {
            var r, i;
            return (
              (t = null == t ? 0 : +t),
              (e = null == e ? 1 : +e),
              function () {
                var o;
                if (null != r) (o = r), (r = null);
                else
                  do {
                    (r = 2 * n() - 1), (o = 2 * n() - 1), (i = r * r + o * o);
                  } while (!i || i > 1);
                return t + e * o * Math.sqrt((-2 * Math.log(i)) / i);
              }
            );
          }
          return (e.source = t), e;
        })(no),
        ro =
          ((function t(n) {
            function e() {
              var t = eo.source(n).apply(this, arguments);
              return function () {
                return Math.exp(t());
              };
            }
            return (e.source = t), e;
          })(no),
          (function t(n) {
            function e(t) {
              return function () {
                for (var e = 0, r = 0; r < t; ++r) e += n();
                return e;
              };
            }
            return (e.source = t), e;
          })(no));
      function io(t, n) {
        var e,
          r,
          i,
          o,
          a = v('beforesend', 'progress', 'load', 'error'),
          u = Pr(),
          s = new XMLHttpRequest(),
          c = null,
          f = null,
          h = 0;
        function l(t) {
          var n,
            r = s.status;
          if (
            (!r &&
              (function (t) {
                var n = t.responseType;
                return n && 'text' !== n ? t.response : t.responseText;
              })(s)) ||
            (r >= 200 && r < 300) ||
            304 === r
          ) {
            if (i)
              try {
                n = i.call(e, s);
              } catch (t) {
                return void a.call('error', e, t);
              }
            else n = s;
            a.call('load', e, n);
          } else a.call('error', e, t);
        }
        if (
          ('undefined' != typeof XDomainRequest &&
            !('withCredentials' in s) &&
            /^(http(s)?:)?\/\//.test(t) &&
            (s = new XDomainRequest()),
          'onload' in s
            ? (s.onload = s.onerror = s.ontimeout = l)
            : (s.onreadystatechange = function (t) {
                s.readyState > 3 && l(t);
              }),
          (s.onprogress = function (t) {
            a.call('progress', e, t);
          }),
          (e = {
            header: function (t, n) {
              return (
                (t = (t + '').toLowerCase()),
                arguments.length < 2 ? u.get(t) : (null == n ? u.remove(t) : u.set(t, n + ''), e)
              );
            },
            mimeType: function (t) {
              return arguments.length ? ((r = null == t ? null : t + ''), e) : r;
            },
            responseType: function (t) {
              return arguments.length ? ((o = t), e) : o;
            },
            timeout: function (t) {
              return arguments.length ? ((h = +t), e) : h;
            },
            user: function (t) {
              return arguments.length < 1 ? c : ((c = null == t ? null : t + ''), e);
            },
            password: function (t) {
              return arguments.length < 1 ? f : ((f = null == t ? null : t + ''), e);
            },
            response: function (t) {
              return (i = t), e;
            },
            get: function (t, n) {
              return e.send('GET', t, n);
            },
            post: function (t, n) {
              return e.send('POST', t, n);
            },
            send: function (n, i, l) {
              return (
                s.open(n, t, !0, c, f),
                null == r || u.has('accept') || u.set('accept', r + ',*/*'),
                s.setRequestHeader &&
                  u.each(function (t, n) {
                    s.setRequestHeader(n, t);
                  }),
                null != r && s.overrideMimeType && s.overrideMimeType(r),
                null != o && (s.responseType = o),
                h > 0 && (s.timeout = h),
                null == l && 'function' == typeof i && ((l = i), (i = null)),
                null != l &&
                  1 === l.length &&
                  (l = (function (t) {
                    return function (n, e) {
                      t(null == n ? e : null);
                    };
                  })(l)),
                null != l &&
                  e.on('error', l).on('load', function (t) {
                    l(null, t);
                  }),
                a.call('beforesend', e, s),
                s.send(null == i ? null : i),
                e
              );
            },
            abort: function () {
              return s.abort(), e;
            },
            on: function () {
              var t = a.on.apply(a, arguments);
              return t === a ? e : t;
            },
          }),
          null != n)
        ) {
          if ('function' != typeof n) throw new Error('invalid callback: ' + n);
          return e.get(n);
        }
        return e;
      }
      function oo(t, n) {
        return function (e, r) {
          var i = io(e).mimeType(t).response(n);
          if (null != r) {
            if ('function' != typeof r) throw new Error('invalid callback: ' + r);
            return i.get(r);
          }
          return i;
        };
      }
      function ao(t, n) {
        return function (e, r, i) {
          arguments.length < 3 && ((i = r), (r = null));
          var o = io(e).mimeType(t);
          return (
            (o.row = function (t) {
              return arguments.length ? o.response(uo(n, (r = t))) : r;
            }),
            o.row(r),
            i ? o.get(i) : o
          );
        };
      }
      function uo(t, n) {
        return function (e) {
          return t(e.responseText, n);
        };
      }
      (function t(n) {
        function e(t) {
          var e = ro.source(n)(t);
          return function () {
            return e() / t;
          };
        }
        return (e.source = t), e;
      })(no),
        (function t(n) {
          function e(t) {
            return function () {
              return -Math.log(1 - n()) / t;
            };
          }
          return (e.source = t), e;
        })(no),
        oo('text/html', function (t) {
          return document.createRange().createContextualFragment(t.responseText);
        }),
        oo('application/json', function (t) {
          return JSON.parse(t.responseText);
        }),
        oo('text/plain', function (t) {
          return t.responseText;
        }),
        oo('application/xml', function (t) {
          var n = t.responseXML;
          if (!n) throw new Error('parse error');
          return n;
        }),
        ao('text/csv', Yr),
        ao('text/tab-separated-values', Xr);
      var so = Array.prototype;
      so.map, so.slice;
      var co = new Date(),
        fo = new Date();
      function ho(t, n, e, r) {
        function i(n) {
          return t((n = new Date(+n))), n;
        }
        return (
          (i.floor = i),
          (i.ceil = function (e) {
            return t((e = new Date(e - 1))), n(e, 1), t(e), e;
          }),
          (i.round = function (t) {
            var n = i(t),
              e = i.ceil(t);
            return t - n < e - t ? n : e;
          }),
          (i.offset = function (t, e) {
            return n((t = new Date(+t)), null == e ? 1 : Math.floor(e)), t;
          }),
          (i.range = function (e, r, o) {
            var a,
              u = [];
            if (((e = i.ceil(e)), (o = null == o ? 1 : Math.floor(o)), !(e < r && o > 0))) return u;
            do {
              u.push((a = new Date(+e))), n(e, o), t(e);
            } while (a < e && e < r);
            return u;
          }),
          (i.filter = function (e) {
            return ho(
              function (n) {
                if (n >= n) for (; t(n), !e(n); ) n.setTime(n - 1);
              },
              function (t, r) {
                if (t >= t)
                  if (r < 0) for (; ++r <= 0; ) for (; n(t, -1), !e(t); );
                  else for (; --r >= 0; ) for (; n(t, 1), !e(t); );
              }
            );
          }),
          e &&
            ((i.count = function (n, r) {
              return co.setTime(+n), fo.setTime(+r), t(co), t(fo), Math.floor(e(co, fo));
            }),
            (i.every = function (t) {
              return (
                (t = Math.floor(t)),
                isFinite(t) && t > 0
                  ? t > 1
                    ? i.filter(
                        r
                          ? function (n) {
                              return r(n) % t == 0;
                            }
                          : function (n) {
                              return i.count(0, n) % t == 0;
                            }
                      )
                    : i
                  : null
              );
            })),
          i
        );
      }
      var lo = ho(
        function () {},
        function (t, n) {
          t.setTime(+t + n);
        },
        function (t, n) {
          return n - t;
        }
      );
      (lo.every = function (t) {
        return (
          (t = Math.floor(t)),
          isFinite(t) && t > 0
            ? t > 1
              ? ho(
                  function (n) {
                    n.setTime(Math.floor(n / t) * t);
                  },
                  function (n, e) {
                    n.setTime(+n + e * t);
                  },
                  function (n, e) {
                    return (e - n) / t;
                  }
                )
              : lo
            : null
        );
      }),
        lo.range;
      var po = 1e3,
        vo = 6e4,
        _o = 36e5,
        yo = 864e5,
        go = 6048e5,
        mo = ho(
          function (t) {
            t.setTime(Math.floor(t / po) * po);
          },
          function (t, n) {
            t.setTime(+t + n * po);
          },
          function (t, n) {
            return (n - t) / po;
          },
          function (t) {
            return t.getUTCSeconds();
          }
        );
      mo.range;
      var bo = ho(
        function (t) {
          t.setTime(Math.floor(t / vo) * vo);
        },
        function (t, n) {
          t.setTime(+t + n * vo);
        },
        function (t, n) {
          return (n - t) / vo;
        },
        function (t) {
          return t.getMinutes();
        }
      );
      bo.range;
      var wo = ho(
        function (t) {
          var n = (t.getTimezoneOffset() * vo) % _o;
          n < 0 && (n += _o), t.setTime(Math.floor((+t - n) / _o) * _o + n);
        },
        function (t, n) {
          t.setTime(+t + n * _o);
        },
        function (t, n) {
          return (n - t) / _o;
        },
        function (t) {
          return t.getHours();
        }
      );
      wo.range;
      var xo = ho(
        function (t) {
          t.setHours(0, 0, 0, 0);
        },
        function (t, n) {
          t.setDate(t.getDate() + n);
        },
        function (t, n) {
          return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * vo) / yo;
        },
        function (t) {
          return t.getDate() - 1;
        }
      );
      const Mo = xo;
      function ko(t) {
        return ho(
          function (n) {
            n.setDate(n.getDate() - ((n.getDay() + 7 - t) % 7)), n.setHours(0, 0, 0, 0);
          },
          function (t, n) {
            t.setDate(t.getDate() + 7 * n);
          },
          function (t, n) {
            return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * vo) / go;
          }
        );
      }
      xo.range;
      var No = ko(0),
        Ao = ko(1),
        To = ko(2),
        Co = ko(3),
        So = ko(4),
        Eo = ko(5),
        Lo = ko(6),
        zo =
          (No.range,
          Ao.range,
          To.range,
          Co.range,
          So.range,
          Eo.range,
          Lo.range,
          ho(
            function (t) {
              t.setDate(1), t.setHours(0, 0, 0, 0);
            },
            function (t, n) {
              t.setMonth(t.getMonth() + n);
            },
            function (t, n) {
              return n.getMonth() - t.getMonth() + 12 * (n.getFullYear() - t.getFullYear());
            },
            function (t) {
              return t.getMonth();
            }
          ));
      zo.range;
      var Uo = ho(
        function (t) {
          t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
        },
        function (t, n) {
          t.setFullYear(t.getFullYear() + n);
        },
        function (t, n) {
          return n.getFullYear() - t.getFullYear();
        },
        function (t) {
          return t.getFullYear();
        }
      );
      Uo.every = function (t) {
        return isFinite((t = Math.floor(t))) && t > 0
          ? ho(
              function (n) {
                n.setFullYear(Math.floor(n.getFullYear() / t) * t),
                  n.setMonth(0, 1),
                  n.setHours(0, 0, 0, 0);
              },
              function (n, e) {
                n.setFullYear(n.getFullYear() + e * t);
              }
            )
          : null;
      };
      const Po = Uo;
      Uo.range;
      var Io = ho(
        function (t) {
          t.setUTCSeconds(0, 0);
        },
        function (t, n) {
          t.setTime(+t + n * vo);
        },
        function (t, n) {
          return (n - t) / vo;
        },
        function (t) {
          return t.getUTCMinutes();
        }
      );
      Io.range;
      var Do = ho(
        function (t) {
          t.setUTCMinutes(0, 0, 0);
        },
        function (t, n) {
          t.setTime(+t + n * _o);
        },
        function (t, n) {
          return (n - t) / _o;
        },
        function (t) {
          return t.getUTCHours();
        }
      );
      Do.range;
      var jo = ho(
        function (t) {
          t.setUTCHours(0, 0, 0, 0);
        },
        function (t, n) {
          t.setUTCDate(t.getUTCDate() + n);
        },
        function (t, n) {
          return (n - t) / yo;
        },
        function (t) {
          return t.getUTCDate() - 1;
        }
      );
      const Ro = jo;
      function Oo(t) {
        return ho(
          function (n) {
            n.setUTCDate(n.getUTCDate() - ((n.getUTCDay() + 7 - t) % 7)), n.setUTCHours(0, 0, 0, 0);
          },
          function (t, n) {
            t.setUTCDate(t.getUTCDate() + 7 * n);
          },
          function (t, n) {
            return (n - t) / go;
          }
        );
      }
      jo.range;
      var qo = Oo(0),
        Fo = Oo(1),
        Yo = Oo(2),
        Ho = Oo(3),
        Xo = Oo(4),
        Bo = Oo(5),
        $o = Oo(6),
        Wo =
          (qo.range,
          Fo.range,
          Yo.range,
          Ho.range,
          Xo.range,
          Bo.range,
          $o.range,
          ho(
            function (t) {
              t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0);
            },
            function (t, n) {
              t.setUTCMonth(t.getUTCMonth() + n);
            },
            function (t, n) {
              return (
                n.getUTCMonth() - t.getUTCMonth() + 12 * (n.getUTCFullYear() - t.getUTCFullYear())
              );
            },
            function (t) {
              return t.getUTCMonth();
            }
          ));
      Wo.range;
      var Vo = ho(
        function (t) {
          t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
        },
        function (t, n) {
          t.setUTCFullYear(t.getUTCFullYear() + n);
        },
        function (t, n) {
          return n.getUTCFullYear() - t.getUTCFullYear();
        },
        function (t) {
          return t.getUTCFullYear();
        }
      );
      Vo.every = function (t) {
        return isFinite((t = Math.floor(t))) && t > 0
          ? ho(
              function (n) {
                n.setUTCFullYear(Math.floor(n.getUTCFullYear() / t) * t),
                  n.setUTCMonth(0, 1),
                  n.setUTCHours(0, 0, 0, 0);
              },
              function (n, e) {
                n.setUTCFullYear(n.getUTCFullYear() + e * t);
              }
            )
          : null;
      };
      const Zo = Vo;
      function Jo(t) {
        if (0 <= t.y && t.y < 100) {
          var n = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
          return n.setFullYear(t.y), n;
        }
        return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
      }
      function Qo(t) {
        if (0 <= t.y && t.y < 100) {
          var n = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
          return n.setUTCFullYear(t.y), n;
        }
        return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
      }
      function Go(t) {
        return { y: t, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0 };
      }
      Vo.range;
      var Ko,
        ta,
        na,
        ea = { '-': '', _: ' ', 0: '0' },
        ra = /^\s*\d+/,
        ia = /^%/,
        oa = /[\\^$*+?|[\]().{}]/g;
      function aa(t, n, e) {
        var r = t < 0 ? '-' : '',
          i = (r ? -t : t) + '',
          o = i.length;
        return r + (o < e ? new Array(e - o + 1).join(n) + i : i);
      }
      function ua(t) {
        return t.replace(oa, '\\$&');
      }
      function sa(t) {
        return new RegExp('^(?:' + t.map(ua).join('|') + ')', 'i');
      }
      function ca(t) {
        for (var n = {}, e = -1, r = t.length; ++e < r; ) n[t[e].toLowerCase()] = e;
        return n;
      }
      function fa(t, n, e) {
        var r = ra.exec(n.slice(e, e + 1));
        return r ? ((t.w = +r[0]), e + r[0].length) : -1;
      }
      function ha(t, n, e) {
        var r = ra.exec(n.slice(e, e + 1));
        return r ? ((t.u = +r[0]), e + r[0].length) : -1;
      }
      function la(t, n, e) {
        var r = ra.exec(n.slice(e, e + 2));
        return r ? ((t.U = +r[0]), e + r[0].length) : -1;
      }
      function da(t, n, e) {
        var r = ra.exec(n.slice(e, e + 2));
        return r ? ((t.V = +r[0]), e + r[0].length) : -1;
      }
      function pa(t, n, e) {
        var r = ra.exec(n.slice(e, e + 2));
        return r ? ((t.W = +r[0]), e + r[0].length) : -1;
      }
      function va(t, n, e) {
        var r = ra.exec(n.slice(e, e + 4));
        return r ? ((t.y = +r[0]), e + r[0].length) : -1;
      }
      function _a(t, n, e) {
        var r = ra.exec(n.slice(e, e + 2));
        return r ? ((t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3)), e + r[0].length) : -1;
      }
      function ya(t, n, e) {
        var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(n.slice(e, e + 6));
        return r ? ((t.Z = r[1] ? 0 : -(r[2] + (r[3] || '00'))), e + r[0].length) : -1;
      }
      function ga(t, n, e) {
        var r = ra.exec(n.slice(e, e + 2));
        return r ? ((t.m = r[0] - 1), e + r[0].length) : -1;
      }
      function ma(t, n, e) {
        var r = ra.exec(n.slice(e, e + 2));
        return r ? ((t.d = +r[0]), e + r[0].length) : -1;
      }
      function ba(t, n, e) {
        var r = ra.exec(n.slice(e, e + 3));
        return r ? ((t.m = 0), (t.d = +r[0]), e + r[0].length) : -1;
      }
      function wa(t, n, e) {
        var r = ra.exec(n.slice(e, e + 2));
        return r ? ((t.H = +r[0]), e + r[0].length) : -1;
      }
      function xa(t, n, e) {
        var r = ra.exec(n.slice(e, e + 2));
        return r ? ((t.M = +r[0]), e + r[0].length) : -1;
      }
      function Ma(t, n, e) {
        var r = ra.exec(n.slice(e, e + 2));
        return r ? ((t.S = +r[0]), e + r[0].length) : -1;
      }
      function ka(t, n, e) {
        var r = ra.exec(n.slice(e, e + 3));
        return r ? ((t.L = +r[0]), e + r[0].length) : -1;
      }
      function Na(t, n, e) {
        var r = ra.exec(n.slice(e, e + 6));
        return r ? ((t.L = Math.floor(r[0] / 1e3)), e + r[0].length) : -1;
      }
      function Aa(t, n, e) {
        var r = ia.exec(n.slice(e, e + 1));
        return r ? e + r[0].length : -1;
      }
      function Ta(t, n, e) {
        var r = ra.exec(n.slice(e));
        return r ? ((t.Q = +r[0]), e + r[0].length) : -1;
      }
      function Ca(t, n, e) {
        var r = ra.exec(n.slice(e));
        return r ? ((t.Q = 1e3 * +r[0]), e + r[0].length) : -1;
      }
      function Sa(t, n) {
        return aa(t.getDate(), n, 2);
      }
      function Ea(t, n) {
        return aa(t.getHours(), n, 2);
      }
      function La(t, n) {
        return aa(t.getHours() % 12 || 12, n, 2);
      }
      function za(t, n) {
        return aa(1 + Mo.count(Po(t), t), n, 3);
      }
      function Ua(t, n) {
        return aa(t.getMilliseconds(), n, 3);
      }
      function Pa(t, n) {
        return Ua(t, n) + '000';
      }
      function Ia(t, n) {
        return aa(t.getMonth() + 1, n, 2);
      }
      function Da(t, n) {
        return aa(t.getMinutes(), n, 2);
      }
      function ja(t, n) {
        return aa(t.getSeconds(), n, 2);
      }
      function Ra(t) {
        var n = t.getDay();
        return 0 === n ? 7 : n;
      }
      function Oa(t, n) {
        return aa(No.count(Po(t), t), n, 2);
      }
      function qa(t, n) {
        var e = t.getDay();
        return (
          (t = e >= 4 || 0 === e ? So(t) : So.ceil(t)),
          aa(So.count(Po(t), t) + (4 === Po(t).getDay()), n, 2)
        );
      }
      function Fa(t) {
        return t.getDay();
      }
      function Ya(t, n) {
        return aa(Ao.count(Po(t), t), n, 2);
      }
      function Ha(t, n) {
        return aa(t.getFullYear() % 100, n, 2);
      }
      function Xa(t, n) {
        return aa(t.getFullYear() % 1e4, n, 4);
      }
      function Ba(t) {
        var n = t.getTimezoneOffset();
        return (n > 0 ? '-' : ((n *= -1), '+')) + aa((n / 60) | 0, '0', 2) + aa(n % 60, '0', 2);
      }
      function $a(t, n) {
        return aa(t.getUTCDate(), n, 2);
      }
      function Wa(t, n) {
        return aa(t.getUTCHours(), n, 2);
      }
      function Va(t, n) {
        return aa(t.getUTCHours() % 12 || 12, n, 2);
      }
      function Za(t, n) {
        return aa(1 + Ro.count(Zo(t), t), n, 3);
      }
      function Ja(t, n) {
        return aa(t.getUTCMilliseconds(), n, 3);
      }
      function Qa(t, n) {
        return Ja(t, n) + '000';
      }
      function Ga(t, n) {
        return aa(t.getUTCMonth() + 1, n, 2);
      }
      function Ka(t, n) {
        return aa(t.getUTCMinutes(), n, 2);
      }
      function tu(t, n) {
        return aa(t.getUTCSeconds(), n, 2);
      }
      function nu(t) {
        var n = t.getUTCDay();
        return 0 === n ? 7 : n;
      }
      function eu(t, n) {
        return aa(qo.count(Zo(t), t), n, 2);
      }
      function ru(t, n) {
        var e = t.getUTCDay();
        return (
          (t = e >= 4 || 0 === e ? Xo(t) : Xo.ceil(t)),
          aa(Xo.count(Zo(t), t) + (4 === Zo(t).getUTCDay()), n, 2)
        );
      }
      function iu(t) {
        return t.getUTCDay();
      }
      function ou(t, n) {
        return aa(Fo.count(Zo(t), t), n, 2);
      }
      function au(t, n) {
        return aa(t.getUTCFullYear() % 100, n, 2);
      }
      function uu(t, n) {
        return aa(t.getUTCFullYear() % 1e4, n, 4);
      }
      function su() {
        return '+0000';
      }
      function cu() {
        return '%';
      }
      function fu(t) {
        return +t;
      }
      function hu(t) {
        return Math.floor(+t / 1e3);
      }
      (Ko = (function (t) {
        var n = t.dateTime,
          e = t.date,
          r = t.time,
          i = t.periods,
          o = t.days,
          a = t.shortDays,
          u = t.months,
          s = t.shortMonths,
          c = sa(i),
          f = ca(i),
          h = sa(o),
          l = ca(o),
          d = sa(a),
          p = ca(a),
          v = sa(u),
          _ = ca(u),
          y = sa(s),
          g = ca(s),
          m = {
            a: function (t) {
              return a[t.getDay()];
            },
            A: function (t) {
              return o[t.getDay()];
            },
            b: function (t) {
              return s[t.getMonth()];
            },
            B: function (t) {
              return u[t.getMonth()];
            },
            c: null,
            d: Sa,
            e: Sa,
            f: Pa,
            H: Ea,
            I: La,
            j: za,
            L: Ua,
            m: Ia,
            M: Da,
            p: function (t) {
              return i[+(t.getHours() >= 12)];
            },
            Q: fu,
            s: hu,
            S: ja,
            u: Ra,
            U: Oa,
            V: qa,
            w: Fa,
            W: Ya,
            x: null,
            X: null,
            y: Ha,
            Y: Xa,
            Z: Ba,
            '%': cu,
          },
          b = {
            a: function (t) {
              return a[t.getUTCDay()];
            },
            A: function (t) {
              return o[t.getUTCDay()];
            },
            b: function (t) {
              return s[t.getUTCMonth()];
            },
            B: function (t) {
              return u[t.getUTCMonth()];
            },
            c: null,
            d: $a,
            e: $a,
            f: Qa,
            H: Wa,
            I: Va,
            j: Za,
            L: Ja,
            m: Ga,
            M: Ka,
            p: function (t) {
              return i[+(t.getUTCHours() >= 12)];
            },
            Q: fu,
            s: hu,
            S: tu,
            u: nu,
            U: eu,
            V: ru,
            w: iu,
            W: ou,
            x: null,
            X: null,
            y: au,
            Y: uu,
            Z: su,
            '%': cu,
          },
          w = {
            a: function (t, n, e) {
              var r = d.exec(n.slice(e));
              return r ? ((t.w = p[r[0].toLowerCase()]), e + r[0].length) : -1;
            },
            A: function (t, n, e) {
              var r = h.exec(n.slice(e));
              return r ? ((t.w = l[r[0].toLowerCase()]), e + r[0].length) : -1;
            },
            b: function (t, n, e) {
              var r = y.exec(n.slice(e));
              return r ? ((t.m = g[r[0].toLowerCase()]), e + r[0].length) : -1;
            },
            B: function (t, n, e) {
              var r = v.exec(n.slice(e));
              return r ? ((t.m = _[r[0].toLowerCase()]), e + r[0].length) : -1;
            },
            c: function (t, e, r) {
              return k(t, n, e, r);
            },
            d: ma,
            e: ma,
            f: Na,
            H: wa,
            I: wa,
            j: ba,
            L: ka,
            m: ga,
            M: xa,
            p: function (t, n, e) {
              var r = c.exec(n.slice(e));
              return r ? ((t.p = f[r[0].toLowerCase()]), e + r[0].length) : -1;
            },
            Q: Ta,
            s: Ca,
            S: Ma,
            u: ha,
            U: la,
            V: da,
            w: fa,
            W: pa,
            x: function (t, n, r) {
              return k(t, e, n, r);
            },
            X: function (t, n, e) {
              return k(t, r, n, e);
            },
            y: _a,
            Y: va,
            Z: ya,
            '%': Aa,
          };
        function x(t, n) {
          return function (e) {
            var r,
              i,
              o,
              a = [],
              u = -1,
              s = 0,
              c = t.length;
            for (e instanceof Date || (e = new Date(+e)); ++u < c; )
              37 === t.charCodeAt(u) &&
                (a.push(t.slice(s, u)),
                null != (i = ea[(r = t.charAt(++u))])
                  ? (r = t.charAt(++u))
                  : (i = 'e' === r ? ' ' : '0'),
                (o = n[r]) && (r = o(e, i)),
                a.push(r),
                (s = u + 1));
            return a.push(t.slice(s, u)), a.join('');
          };
        }
        function M(t, n) {
          return function (e) {
            var r,
              i,
              o = Go(1900);
            if (k(o, t, (e += ''), 0) != e.length) return null;
            if ('Q' in o) return new Date(o.Q);
            if (('p' in o && (o.H = (o.H % 12) + 12 * o.p), 'V' in o)) {
              if (o.V < 1 || o.V > 53) return null;
              'w' in o || (o.w = 1),
                'Z' in o
                  ? ((i = (r = Qo(Go(o.y))).getUTCDay()),
                    (r = i > 4 || 0 === i ? Fo.ceil(r) : Fo(r)),
                    (r = Ro.offset(r, 7 * (o.V - 1))),
                    (o.y = r.getUTCFullYear()),
                    (o.m = r.getUTCMonth()),
                    (o.d = r.getUTCDate() + ((o.w + 6) % 7)))
                  : ((i = (r = n(Go(o.y))).getDay()),
                    (r = i > 4 || 0 === i ? Ao.ceil(r) : Ao(r)),
                    (r = Mo.offset(r, 7 * (o.V - 1))),
                    (o.y = r.getFullYear()),
                    (o.m = r.getMonth()),
                    (o.d = r.getDate() + ((o.w + 6) % 7)));
            } else
              ('W' in o || 'U' in o) &&
                ('w' in o || (o.w = 'u' in o ? o.u % 7 : 'W' in o ? 1 : 0),
                (i = 'Z' in o ? Qo(Go(o.y)).getUTCDay() : n(Go(o.y)).getDay()),
                (o.m = 0),
                (o.d =
                  'W' in o
                    ? ((o.w + 6) % 7) + 7 * o.W - ((i + 5) % 7)
                    : o.w + 7 * o.U - ((i + 6) % 7)));
            return 'Z' in o ? ((o.H += (o.Z / 100) | 0), (o.M += o.Z % 100), Qo(o)) : n(o);
          };
        }
        function k(t, n, e, r) {
          for (var i, o, a = 0, u = n.length, s = e.length; a < u; ) {
            if (r >= s) return -1;
            if (37 === (i = n.charCodeAt(a++))) {
              if (
                ((i = n.charAt(a++)), !(o = w[i in ea ? n.charAt(a++) : i]) || (r = o(t, e, r)) < 0)
              )
                return -1;
            } else if (i != e.charCodeAt(r++)) return -1;
          }
          return r;
        }
        return (
          (m.x = x(e, m)),
          (m.X = x(r, m)),
          (m.c = x(n, m)),
          (b.x = x(e, b)),
          (b.X = x(r, b)),
          (b.c = x(n, b)),
          {
            format: function (t) {
              var n = x((t += ''), m);
              return (
                (n.toString = function () {
                  return t;
                }),
                n
              );
            },
            parse: function (t) {
              var n = M((t += ''), Jo);
              return (
                (n.toString = function () {
                  return t;
                }),
                n
              );
            },
            utcFormat: function (t) {
              var n = x((t += ''), b);
              return (
                (n.toString = function () {
                  return t;
                }),
                n
              );
            },
            utcParse: function (t) {
              var n = M(t, Qo);
              return (
                (n.toString = function () {
                  return t;
                }),
                n
              );
            },
          }
        );
      })({
        dateTime: '%x, %X',
        date: '%-m/%-d/%Y',
        time: '%-I:%M:%S %p',
        periods: ['AM', 'PM'],
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        shortMonths: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      })),
        Ko.format,
        Ko.parse,
        (ta = Ko.utcFormat),
        (na = Ko.utcParse);
      var lu = '%Y-%m-%dT%H:%M:%S.%LZ';
      function du(t) {
        return t.match(/.{6}/g).map(function (t) {
          return '#' + t;
        });
      }
      function pu(t) {
        var n = t.length;
        return function (e) {
          return t[Math.max(0, Math.min(n - 1, Math.floor(e * n)))];
        };
      }
      Date.prototype.toISOString || ta(lu),
        +new Date('2000-01-01T00:00:00.000Z') || na(lu),
        du('1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf'),
        du(
          '393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6'
        ),
        du(
          '3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9'
        ),
        du(
          '1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5'
        ),
        ke(Wn(300, 0.5, 0), Wn(-240, 0.5, 1)),
        ke(Wn(-100, 0.75, 0.35), Wn(80, 1.5, 0.8)),
        ke(Wn(260, 0.75, 0.35), Wn(80, 1.5, 0.8)),
        Wn(),
        pu(
          du(
            '44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725'
          )
        ),
        pu(
          du(
            '00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf'
          )
        ),
        pu(
          du(
            '00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4'
          )
        ),
        pu(
          du(
            '0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921'
          )
        ),
        Math.abs,
        Math.atan2,
        Math.cos,
        Math.max,
        Math.min,
        Math.sin,
        Math.sqrt;
      var vu = Math.PI,
        _u = 2 * vu;
      function yu(t) {
        this._context = t;
      }
      function gu(t) {
        this._curve = t;
      }
      (yu.prototype = {
        areaStart: function () {
          this._line = 0;
        },
        areaEnd: function () {
          this._line = NaN;
        },
        lineStart: function () {
          this._point = 0;
        },
        lineEnd: function () {
          (this._line || (0 !== this._line && 1 === this._point)) && this._context.closePath(),
            (this._line = 1 - this._line);
        },
        point: function (t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              (this._point = 1),
                this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
              break;
            case 1:
              this._point = 2;
            default:
              this._context.lineTo(t, n);
          }
        },
      }),
        (gu.prototype = {
          areaStart: function () {
            this._curve.areaStart();
          },
          areaEnd: function () {
            this._curve.areaEnd();
          },
          lineStart: function () {
            this._curve.lineStart();
          },
          lineEnd: function () {
            this._curve.lineEnd();
          },
          point: function (t, n) {
            this._curve.point(n * Math.sin(t), n * -Math.cos(t));
          },
        }),
        Array.prototype.slice,
        Math.sqrt(1 / 3);
      Math.sin(vu / 10), Math.sin((7 * vu) / 10);
      function mu() {}
      function bu(t, n, e) {
        t._context.bezierCurveTo(
          (2 * t._x0 + t._x1) / 3,
          (2 * t._y0 + t._y1) / 3,
          (t._x0 + 2 * t._x1) / 3,
          (t._y0 + 2 * t._y1) / 3,
          (t._x0 + 4 * t._x1 + n) / 6,
          (t._y0 + 4 * t._y1 + e) / 6
        );
      }
      function wu(t) {
        this._context = t;
      }
      function xu(t, n) {
        (this._basis = new wu(t)), (this._beta = n);
      }
      function Mu(t, n, e) {
        t._context.bezierCurveTo(
          t._x1 + t._k * (t._x2 - t._x0),
          t._y1 + t._k * (t._y2 - t._y0),
          t._x2 + t._k * (t._x1 - n),
          t._y2 + t._k * (t._y1 - e),
          t._x2,
          t._y2
        );
      }
      function ku(t, n) {
        (this._context = t), (this._k = (1 - n) / 6);
      }
      function Nu(t, n) {
        (this._context = t), (this._k = (1 - n) / 6);
      }
      function Au(t, n) {
        (this._context = t), (this._k = (1 - n) / 6);
      }
      function Tu(t, n, e) {
        var r = t._x1,
          i = t._y1,
          o = t._x2,
          a = t._y2;
        if (t._l01_a > 1e-12) {
          var u = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a,
            s = 3 * t._l01_a * (t._l01_a + t._l12_a);
          (r = (r * u - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / s),
            (i = (i * u - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / s);
        }
        if (t._l23_a > 1e-12) {
          var c = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a,
            f = 3 * t._l23_a * (t._l23_a + t._l12_a);
          (o = (o * c + t._x1 * t._l23_2a - n * t._l12_2a) / f),
            (a = (a * c + t._y1 * t._l23_2a - e * t._l12_2a) / f);
        }
        t._context.bezierCurveTo(r, i, o, a, t._x2, t._y2);
      }
      function Cu(t, n) {
        (this._context = t), (this._alpha = n);
      }
      function Su(t, n) {
        (this._context = t), (this._alpha = n);
      }
      function Eu(t, n) {
        (this._context = t), (this._alpha = n);
      }
      function Lu(t) {
        return t < 0 ? -1 : 1;
      }
      function zu(t, n, e) {
        var r = t._x1 - t._x0,
          i = n - t._x1,
          o = (t._y1 - t._y0) / (r || (i < 0 && -0)),
          a = (e - t._y1) / (i || (r < 0 && -0)),
          u = (o * i + a * r) / (r + i);
        return (Lu(o) + Lu(a)) * Math.min(Math.abs(o), Math.abs(a), 0.5 * Math.abs(u)) || 0;
      }
      function Uu(t, n) {
        var e = t._x1 - t._x0;
        return e ? ((3 * (t._y1 - t._y0)) / e - n) / 2 : n;
      }
      function Pu(t, n, e) {
        var r = t._x0,
          i = t._y0,
          o = t._x1,
          a = t._y1,
          u = (o - r) / 3;
        t._context.bezierCurveTo(r + u, i + u * n, o - u, a - u * e, o, a);
      }
      function Iu(t) {
        this._context = t;
      }
      function Du(t) {
        this._context = t;
      }
      function ju() {
        this._ = null;
      }
      function Ru(t) {
        t.U = t.C = t.L = t.R = t.P = t.N = null;
      }
      function Ou(t, n) {
        var e = n,
          r = n.R,
          i = e.U;
        i ? (i.L === e ? (i.L = r) : (i.R = r)) : (t._ = r),
          (r.U = i),
          (e.U = r),
          (e.R = r.L),
          e.R && (e.R.U = e),
          (r.L = e);
      }
      function qu(t, n) {
        var e = n,
          r = n.L,
          i = e.U;
        i ? (i.L === e ? (i.L = r) : (i.R = r)) : (t._ = r),
          (r.U = i),
          (e.U = r),
          (e.L = r.R),
          e.L && (e.L.U = e),
          (r.R = e);
      }
      function Fu(t) {
        for (; t.L; ) t = t.L;
        return t;
      }
      Math.sin(_u / 10),
        Math.cos(_u / 10),
        Math.sqrt(3),
        Math.sqrt(3),
        Math.sqrt(12),
        (wu.prototype = {
          areaStart: function () {
            this._line = 0;
          },
          areaEnd: function () {
            this._line = NaN;
          },
          lineStart: function () {
            (this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
          },
          lineEnd: function () {
            switch (this._point) {
              case 3:
                bu(this, this._x1, this._y1);
              case 2:
                this._context.lineTo(this._x1, this._y1);
            }
            (this._line || (0 !== this._line && 1 === this._point)) && this._context.closePath(),
              (this._line = 1 - this._line);
          },
          point: function (t, n) {
            switch (((t = +t), (n = +n), this._point)) {
              case 0:
                (this._point = 1),
                  this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                break;
              case 1:
                this._point = 2;
                break;
              case 2:
                (this._point = 3),
                  this._context.lineTo(
                    (5 * this._x0 + this._x1) / 6,
                    (5 * this._y0 + this._y1) / 6
                  );
              default:
                bu(this, t, n);
            }
            (this._x0 = this._x1), (this._x1 = t), (this._y0 = this._y1), (this._y1 = n);
          },
        }),
        (xu.prototype = {
          lineStart: function () {
            (this._x = []), (this._y = []), this._basis.lineStart();
          },
          lineEnd: function () {
            var t = this._x,
              n = this._y,
              e = t.length - 1;
            if (e > 0)
              for (var r, i = t[0], o = n[0], a = t[e] - i, u = n[e] - o, s = -1; ++s <= e; )
                (r = s / e),
                  this._basis.point(
                    this._beta * t[s] + (1 - this._beta) * (i + r * a),
                    this._beta * n[s] + (1 - this._beta) * (o + r * u)
                  );
            (this._x = this._y = null), this._basis.lineEnd();
          },
          point: function (t, n) {
            this._x.push(+t), this._y.push(+n);
          },
        }),
        (function t(n) {
          function e(t) {
            return 1 === n ? new wu(t) : new xu(t, n);
          }
          return (
            (e.beta = function (n) {
              return t(+n);
            }),
            e
          );
        })(0.85),
        (ku.prototype = {
          areaStart: function () {
            this._line = 0;
          },
          areaEnd: function () {
            this._line = NaN;
          },
          lineStart: function () {
            (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
              (this._point = 0);
          },
          lineEnd: function () {
            switch (this._point) {
              case 2:
                this._context.lineTo(this._x2, this._y2);
                break;
              case 3:
                Mu(this, this._x1, this._y1);
            }
            (this._line || (0 !== this._line && 1 === this._point)) && this._context.closePath(),
              (this._line = 1 - this._line);
          },
          point: function (t, n) {
            switch (((t = +t), (n = +n), this._point)) {
              case 0:
                (this._point = 1),
                  this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                break;
              case 1:
                (this._point = 2), (this._x1 = t), (this._y1 = n);
                break;
              case 2:
                this._point = 3;
              default:
                Mu(this, t, n);
            }
            (this._x0 = this._x1),
              (this._x1 = this._x2),
              (this._x2 = t),
              (this._y0 = this._y1),
              (this._y1 = this._y2),
              (this._y2 = n);
          },
        }),
        (function t(n) {
          function e(t) {
            return new ku(t, n);
          }
          return (
            (e.tension = function (n) {
              return t(+n);
            }),
            e
          );
        })(0),
        (Nu.prototype = {
          areaStart: mu,
          areaEnd: mu,
          lineStart: function () {
            (this._x0 =
              this._x1 =
              this._x2 =
              this._x3 =
              this._x4 =
              this._x5 =
              this._y0 =
              this._y1 =
              this._y2 =
              this._y3 =
              this._y4 =
              this._y5 =
                NaN),
              (this._point = 0);
          },
          lineEnd: function () {
            switch (this._point) {
              case 1:
                this._context.moveTo(this._x3, this._y3), this._context.closePath();
                break;
              case 2:
                this._context.lineTo(this._x3, this._y3), this._context.closePath();
                break;
              case 3:
                this.point(this._x3, this._y3),
                  this.point(this._x4, this._y4),
                  this.point(this._x5, this._y5);
            }
          },
          point: function (t, n) {
            switch (((t = +t), (n = +n), this._point)) {
              case 0:
                (this._point = 1), (this._x3 = t), (this._y3 = n);
                break;
              case 1:
                (this._point = 2), this._context.moveTo((this._x4 = t), (this._y4 = n));
                break;
              case 2:
                (this._point = 3), (this._x5 = t), (this._y5 = n);
                break;
              default:
                Mu(this, t, n);
            }
            (this._x0 = this._x1),
              (this._x1 = this._x2),
              (this._x2 = t),
              (this._y0 = this._y1),
              (this._y1 = this._y2),
              (this._y2 = n);
          },
        }),
        (function t(n) {
          function e(t) {
            return new Nu(t, n);
          }
          return (
            (e.tension = function (n) {
              return t(+n);
            }),
            e
          );
        })(0),
        (Au.prototype = {
          areaStart: function () {
            this._line = 0;
          },
          areaEnd: function () {
            this._line = NaN;
          },
          lineStart: function () {
            (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
              (this._point = 0);
          },
          lineEnd: function () {
            (this._line || (0 !== this._line && 3 === this._point)) && this._context.closePath(),
              (this._line = 1 - this._line);
          },
          point: function (t, n) {
            switch (((t = +t), (n = +n), this._point)) {
              case 0:
                this._point = 1;
                break;
              case 1:
                this._point = 2;
                break;
              case 2:
                (this._point = 3),
                  this._line
                    ? this._context.lineTo(this._x2, this._y2)
                    : this._context.moveTo(this._x2, this._y2);
                break;
              case 3:
                this._point = 4;
              default:
                Mu(this, t, n);
            }
            (this._x0 = this._x1),
              (this._x1 = this._x2),
              (this._x2 = t),
              (this._y0 = this._y1),
              (this._y1 = this._y2),
              (this._y2 = n);
          },
        }),
        (function t(n) {
          function e(t) {
            return new Au(t, n);
          }
          return (
            (e.tension = function (n) {
              return t(+n);
            }),
            e
          );
        })(0),
        (Cu.prototype = {
          areaStart: function () {
            this._line = 0;
          },
          areaEnd: function () {
            this._line = NaN;
          },
          lineStart: function () {
            (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
              (this._l01_a =
                this._l12_a =
                this._l23_a =
                this._l01_2a =
                this._l12_2a =
                this._l23_2a =
                this._point =
                  0);
          },
          lineEnd: function () {
            switch (this._point) {
              case 2:
                this._context.lineTo(this._x2, this._y2);
                break;
              case 3:
                this.point(this._x2, this._y2);
            }
            (this._line || (0 !== this._line && 1 === this._point)) && this._context.closePath(),
              (this._line = 1 - this._line);
          },
          point: function (t, n) {
            if (((t = +t), (n = +n), this._point)) {
              var e = this._x2 - t,
                r = this._y2 - n;
              this._l23_a = Math.sqrt((this._l23_2a = Math.pow(e * e + r * r, this._alpha)));
            }
            switch (this._point) {
              case 0:
                (this._point = 1),
                  this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                break;
              case 1:
                this._point = 2;
                break;
              case 2:
                this._point = 3;
              default:
                Tu(this, t, n);
            }
            (this._l01_a = this._l12_a),
              (this._l12_a = this._l23_a),
              (this._l01_2a = this._l12_2a),
              (this._l12_2a = this._l23_2a),
              (this._x0 = this._x1),
              (this._x1 = this._x2),
              (this._x2 = t),
              (this._y0 = this._y1),
              (this._y1 = this._y2),
              (this._y2 = n);
          },
        }),
        (function t(n) {
          function e(t) {
            return n ? new Cu(t, n) : new ku(t, 0);
          }
          return (
            (e.alpha = function (n) {
              return t(+n);
            }),
            e
          );
        })(0.5),
        (Su.prototype = {
          areaStart: mu,
          areaEnd: mu,
          lineStart: function () {
            (this._x0 =
              this._x1 =
              this._x2 =
              this._x3 =
              this._x4 =
              this._x5 =
              this._y0 =
              this._y1 =
              this._y2 =
              this._y3 =
              this._y4 =
              this._y5 =
                NaN),
              (this._l01_a =
                this._l12_a =
                this._l23_a =
                this._l01_2a =
                this._l12_2a =
                this._l23_2a =
                this._point =
                  0);
          },
          lineEnd: function () {
            switch (this._point) {
              case 1:
                this._context.moveTo(this._x3, this._y3), this._context.closePath();
                break;
              case 2:
                this._context.lineTo(this._x3, this._y3), this._context.closePath();
                break;
              case 3:
                this.point(this._x3, this._y3),
                  this.point(this._x4, this._y4),
                  this.point(this._x5, this._y5);
            }
          },
          point: function (t, n) {
            if (((t = +t), (n = +n), this._point)) {
              var e = this._x2 - t,
                r = this._y2 - n;
              this._l23_a = Math.sqrt((this._l23_2a = Math.pow(e * e + r * r, this._alpha)));
            }
            switch (this._point) {
              case 0:
                (this._point = 1), (this._x3 = t), (this._y3 = n);
                break;
              case 1:
                (this._point = 2), this._context.moveTo((this._x4 = t), (this._y4 = n));
                break;
              case 2:
                (this._point = 3), (this._x5 = t), (this._y5 = n);
                break;
              default:
                Tu(this, t, n);
            }
            (this._l01_a = this._l12_a),
              (this._l12_a = this._l23_a),
              (this._l01_2a = this._l12_2a),
              (this._l12_2a = this._l23_2a),
              (this._x0 = this._x1),
              (this._x1 = this._x2),
              (this._x2 = t),
              (this._y0 = this._y1),
              (this._y1 = this._y2),
              (this._y2 = n);
          },
        }),
        (function t(n) {
          function e(t) {
            return n ? new Su(t, n) : new Nu(t, 0);
          }
          return (
            (e.alpha = function (n) {
              return t(+n);
            }),
            e
          );
        })(0.5),
        (Eu.prototype = {
          areaStart: function () {
            this._line = 0;
          },
          areaEnd: function () {
            this._line = NaN;
          },
          lineStart: function () {
            (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
              (this._l01_a =
                this._l12_a =
                this._l23_a =
                this._l01_2a =
                this._l12_2a =
                this._l23_2a =
                this._point =
                  0);
          },
          lineEnd: function () {
            (this._line || (0 !== this._line && 3 === this._point)) && this._context.closePath(),
              (this._line = 1 - this._line);
          },
          point: function (t, n) {
            if (((t = +t), (n = +n), this._point)) {
              var e = this._x2 - t,
                r = this._y2 - n;
              this._l23_a = Math.sqrt((this._l23_2a = Math.pow(e * e + r * r, this._alpha)));
            }
            switch (this._point) {
              case 0:
                this._point = 1;
                break;
              case 1:
                this._point = 2;
                break;
              case 2:
                (this._point = 3),
                  this._line
                    ? this._context.lineTo(this._x2, this._y2)
                    : this._context.moveTo(this._x2, this._y2);
                break;
              case 3:
                this._point = 4;
              default:
                Tu(this, t, n);
            }
            (this._l01_a = this._l12_a),
              (this._l12_a = this._l23_a),
              (this._l01_2a = this._l12_2a),
              (this._l12_2a = this._l23_2a),
              (this._x0 = this._x1),
              (this._x1 = this._x2),
              (this._x2 = t),
              (this._y0 = this._y1),
              (this._y1 = this._y2),
              (this._y2 = n);
          },
        }),
        (function t(n) {
          function e(t) {
            return n ? new Eu(t, n) : new Au(t, 0);
          }
          return (
            (e.alpha = function (n) {
              return t(+n);
            }),
            e
          );
        })(0.5),
        (Iu.prototype = {
          areaStart: function () {
            this._line = 0;
          },
          areaEnd: function () {
            this._line = NaN;
          },
          lineStart: function () {
            (this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN), (this._point = 0);
          },
          lineEnd: function () {
            switch (this._point) {
              case 2:
                this._context.lineTo(this._x1, this._y1);
                break;
              case 3:
                Pu(this, this._t0, Uu(this, this._t0));
            }
            (this._line || (0 !== this._line && 1 === this._point)) && this._context.closePath(),
              (this._line = 1 - this._line);
          },
          point: function (t, n) {
            var e = NaN;
            if (((n = +n), (t = +t) !== this._x1 || n !== this._y1)) {
              switch (this._point) {
                case 0:
                  (this._point = 1),
                    this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                  break;
                case 1:
                  this._point = 2;
                  break;
                case 2:
                  (this._point = 3), Pu(this, Uu(this, (e = zu(this, t, n))), e);
                  break;
                default:
                  Pu(this, this._t0, (e = zu(this, t, n)));
              }
              (this._x0 = this._x1),
                (this._x1 = t),
                (this._y0 = this._y1),
                (this._y1 = n),
                (this._t0 = e);
            }
          },
        }),
        ((function (t) {
          this._context = new Du(t);
        }.prototype = Object.create(Iu.prototype)).point = function (t, n) {
          Iu.prototype.point.call(this, n, t);
        }),
        (Du.prototype = {
          moveTo: function (t, n) {
            this._context.moveTo(n, t);
          },
          closePath: function () {
            this._context.closePath();
          },
          lineTo: function (t, n) {
            this._context.lineTo(n, t);
          },
          bezierCurveTo: function (t, n, e, r, i, o) {
            this._context.bezierCurveTo(n, t, r, e, o, i);
          },
        }),
        (ju.prototype = {
          constructor: ju,
          insert: function (t, n) {
            var e, r, i;
            if (t) {
              if (((n.P = t), (n.N = t.N), t.N && (t.N.P = n), (t.N = n), t.R)) {
                for (t = t.R; t.L; ) t = t.L;
                t.L = n;
              } else t.R = n;
              e = t;
            } else
              this._
                ? ((t = Fu(this._)), (n.P = null), (n.N = t), (t.P = t.L = n), (e = t))
                : ((n.P = n.N = null), (this._ = n), (e = null));
            for (n.L = n.R = null, n.U = e, n.C = !0, t = n; e && e.C; )
              e === (r = e.U).L
                ? (i = r.R) && i.C
                  ? ((e.C = i.C = !1), (r.C = !0), (t = r))
                  : (t === e.R && (Ou(this, e), (e = (t = e).U)),
                    (e.C = !1),
                    (r.C = !0),
                    qu(this, r))
                : (i = r.L) && i.C
                ? ((e.C = i.C = !1), (r.C = !0), (t = r))
                : (t === e.L && (qu(this, e), (e = (t = e).U)),
                  (e.C = !1),
                  (r.C = !0),
                  Ou(this, r)),
                (e = t.U);
            this._.C = !1;
          },
          remove: function (t) {
            t.N && (t.N.P = t.P), t.P && (t.P.N = t.N), (t.N = t.P = null);
            var n,
              e,
              r,
              i = t.U,
              o = t.L,
              a = t.R;
            if (
              ((e = o ? (a ? Fu(a) : o) : a),
              i ? (i.L === t ? (i.L = e) : (i.R = e)) : (this._ = e),
              o && a
                ? ((r = e.C),
                  (e.C = t.C),
                  (e.L = o),
                  (o.U = e),
                  e !== a
                    ? ((i = e.U), (e.U = t.U), (t = e.R), (i.L = t), (e.R = a), (a.U = e))
                    : ((e.U = i), (i = e), (t = e.R)))
                : ((r = t.C), (t = e)),
              t && (t.U = i),
              !r)
            )
              if (t && t.C) t.C = !1;
              else {
                do {
                  if (t === this._) break;
                  if (t === i.L) {
                    if (
                      ((n = i.R).C && ((n.C = !1), (i.C = !0), Ou(this, i), (n = i.R)),
                      (n.L && n.L.C) || (n.R && n.R.C))
                    ) {
                      (n.R && n.R.C) || ((n.L.C = !1), (n.C = !0), qu(this, n), (n = i.R)),
                        (n.C = i.C),
                        (i.C = n.R.C = !1),
                        Ou(this, i),
                        (t = this._);
                      break;
                    }
                  } else if (
                    ((n = i.L).C && ((n.C = !1), (i.C = !0), qu(this, i), (n = i.L)),
                    (n.L && n.L.C) || (n.R && n.R.C))
                  ) {
                    (n.L && n.L.C) || ((n.R.C = !1), (n.C = !0), Ou(this, n), (n = i.L)),
                      (n.C = i.C),
                      (i.C = n.L.C = !1),
                      qu(this, i),
                      (t = this._);
                    break;
                  }
                  (n.C = !0), (t = i), (i = i.U);
                } while (!t.C);
                t && (t.C = !1);
              }
          },
        });
      const Yu = ju;
      function Hu(t, n, e, r) {
        var i = [null, null],
          o = ds.push(i) - 1;
        return (
          (i.left = t),
          (i.right = n),
          e && Bu(i, t, n, e),
          r && Bu(i, n, t, r),
          hs[t.index].halfedges.push(o),
          hs[n.index].halfedges.push(o),
          i
        );
      }
      function Xu(t, n, e) {
        var r = [n, e];
        return (r.left = t), r;
      }
      function Bu(t, n, e, r) {
        t[0] || t[1]
          ? t.left === e
            ? (t[1] = r)
            : (t[0] = r)
          : ((t[0] = r), (t.left = n), (t.right = e));
      }
      function $u(t, n, e, r, i) {
        var o,
          a = t[0],
          u = t[1],
          s = a[0],
          c = a[1],
          f = 0,
          h = 1,
          l = u[0] - s,
          d = u[1] - c;
        if (((o = n - s), l || !(o > 0))) {
          if (((o /= l), l < 0)) {
            if (o < f) return;
            o < h && (h = o);
          } else if (l > 0) {
            if (o > h) return;
            o > f && (f = o);
          }
          if (((o = r - s), l || !(o < 0))) {
            if (((o /= l), l < 0)) {
              if (o > h) return;
              o > f && (f = o);
            } else if (l > 0) {
              if (o < f) return;
              o < h && (h = o);
            }
            if (((o = e - c), d || !(o > 0))) {
              if (((o /= d), d < 0)) {
                if (o < f) return;
                o < h && (h = o);
              } else if (d > 0) {
                if (o > h) return;
                o > f && (f = o);
              }
              if (((o = i - c), d || !(o < 0))) {
                if (((o /= d), d < 0)) {
                  if (o > h) return;
                  o > f && (f = o);
                } else if (d > 0) {
                  if (o < f) return;
                  o < h && (h = o);
                }
                return (
                  !(f > 0 || h < 1) ||
                  (f > 0 && (t[0] = [s + f * l, c + f * d]),
                  h < 1 && (t[1] = [s + h * l, c + h * d]),
                  !0)
                );
              }
            }
          }
        }
      }
      function Wu(t, n, e, r, i) {
        var o = t[1];
        if (o) return !0;
        var a,
          u,
          s = t[0],
          c = t.left,
          f = t.right,
          h = c[0],
          l = c[1],
          d = f[0],
          p = f[1],
          v = (h + d) / 2,
          _ = (l + p) / 2;
        if (p === l) {
          if (v < n || v >= r) return;
          if (h > d) {
            if (s) {
              if (s[1] >= i) return;
            } else s = [v, e];
            o = [v, i];
          } else {
            if (s) {
              if (s[1] < e) return;
            } else s = [v, i];
            o = [v, e];
          }
        } else if (((u = _ - (a = (h - d) / (p - l)) * v), a < -1 || a > 1))
          if (h > d) {
            if (s) {
              if (s[1] >= i) return;
            } else s = [(e - u) / a, e];
            o = [(i - u) / a, i];
          } else {
            if (s) {
              if (s[1] < e) return;
            } else s = [(i - u) / a, i];
            o = [(e - u) / a, e];
          }
        else if (l < p) {
          if (s) {
            if (s[0] >= r) return;
          } else s = [n, a * n + u];
          o = [r, a * r + u];
        } else {
          if (s) {
            if (s[0] < n) return;
          } else s = [r, a * r + u];
          o = [n, a * n + u];
        }
        return (t[0] = s), (t[1] = o), !0;
      }
      function Vu(t, n) {
        var e = t.site,
          r = n.left,
          i = n.right;
        return (
          e === i && ((i = r), (r = e)),
          i
            ? Math.atan2(i[1] - r[1], i[0] - r[0])
            : (e === r ? ((r = n[1]), (i = n[0])) : ((r = n[0]), (i = n[1])),
              Math.atan2(r[0] - i[0], i[1] - r[1]))
        );
      }
      function Zu(t, n) {
        return n[+(n.left !== t.site)];
      }
      function Ju(t, n) {
        return n[+(n.left === t.site)];
      }
      var Qu,
        Gu = [];
      function Ku() {
        Ru(this), (this.x = this.y = this.arc = this.site = this.cy = null);
      }
      function ts(t) {
        var n = t.P,
          e = t.N;
        if (n && e) {
          var r = n.site,
            i = t.site,
            o = e.site;
          if (r !== o) {
            var a = i[0],
              u = i[1],
              s = r[0] - a,
              c = r[1] - u,
              f = o[0] - a,
              h = o[1] - u,
              l = 2 * (s * h - c * f);
            if (!(l >= -vs)) {
              var d = s * s + c * c,
                p = f * f + h * h,
                v = (h * d - c * p) / l,
                _ = (s * p - f * d) / l,
                y = Gu.pop() || new Ku();
              (y.arc = t),
                (y.site = i),
                (y.x = v + a),
                (y.y = (y.cy = _ + u) + Math.sqrt(v * v + _ * _)),
                (t.circle = y);
              for (var g = null, m = ls._; m; )
                if (y.y < m.y || (y.y === m.y && y.x <= m.x)) {
                  if (!m.L) {
                    g = m.P;
                    break;
                  }
                  m = m.L;
                } else {
                  if (!m.R) {
                    g = m;
                    break;
                  }
                  m = m.R;
                }
              ls.insert(g, y), g || (Qu = y);
            }
          }
        }
      }
      function ns(t) {
        var n = t.circle;
        n && (n.P || (Qu = n.N), ls.remove(n), Gu.push(n), Ru(n), (t.circle = null));
      }
      var es = [];
      function rs() {
        Ru(this), (this.edge = this.site = this.circle = null);
      }
      function is(t) {
        var n = es.pop() || new rs();
        return (n.site = t), n;
      }
      function os(t) {
        ns(t), fs.remove(t), es.push(t), Ru(t);
      }
      function as(t) {
        var n = t.circle,
          e = n.x,
          r = n.cy,
          i = [e, r],
          o = t.P,
          a = t.N,
          u = [t];
        os(t);
        for (
          var s = o;
          s.circle && Math.abs(e - s.circle.x) < ps && Math.abs(r - s.circle.cy) < ps;

        )
          (o = s.P), u.unshift(s), os(s), (s = o);
        u.unshift(s), ns(s);
        for (
          var c = a;
          c.circle && Math.abs(e - c.circle.x) < ps && Math.abs(r - c.circle.cy) < ps;

        )
          (a = c.N), u.push(c), os(c), (c = a);
        u.push(c), ns(c);
        var f,
          h = u.length;
        for (f = 1; f < h; ++f) (c = u[f]), (s = u[f - 1]), Bu(c.edge, s.site, c.site, i);
        (s = u[0]), ((c = u[h - 1]).edge = Hu(s.site, c.site, null, i)), ts(s), ts(c);
      }
      function us(t) {
        for (var n, e, r, i, o = t[0], a = t[1], u = fs._; u; )
          if ((r = ss(u, a) - o) > ps) u = u.L;
          else {
            if (!((i = o - cs(u, a)) > ps)) {
              r > -ps ? ((n = u.P), (e = u)) : i > -ps ? ((n = u), (e = u.N)) : (n = e = u);
              break;
            }
            if (!u.R) {
              n = u;
              break;
            }
            u = u.R;
          }
        !(function (t) {
          hs[t.index] = { site: t, halfedges: [] };
        })(t);
        var s = is(t);
        if ((fs.insert(n, s), n || e)) {
          if (n === e)
            return (
              ns(n),
              (e = is(n.site)),
              fs.insert(s, e),
              (s.edge = e.edge = Hu(n.site, s.site)),
              ts(n),
              void ts(e)
            );
          if (e) {
            ns(n), ns(e);
            var c = n.site,
              f = c[0],
              h = c[1],
              l = t[0] - f,
              d = t[1] - h,
              p = e.site,
              v = p[0] - f,
              _ = p[1] - h,
              y = 2 * (l * _ - d * v),
              g = l * l + d * d,
              m = v * v + _ * _,
              b = [(_ * g - d * m) / y + f, (l * m - v * g) / y + h];
            Bu(e.edge, c, p, b),
              (s.edge = Hu(c, t, null, b)),
              (e.edge = Hu(t, p, null, b)),
              ts(n),
              ts(e);
          } else s.edge = Hu(n.site, s.site);
        }
      }
      function ss(t, n) {
        var e = t.site,
          r = e[0],
          i = e[1],
          o = i - n;
        if (!o) return r;
        var a = t.P;
        if (!a) return -1 / 0;
        var u = (e = a.site)[0],
          s = e[1],
          c = s - n;
        if (!c) return u;
        var f = u - r,
          h = 1 / o - 1 / c,
          l = f / c;
        return h
          ? (-l + Math.sqrt(l * l - 2 * h * ((f * f) / (-2 * c) - s + c / 2 + i - o / 2))) / h + r
          : (r + u) / 2;
      }
      function cs(t, n) {
        var e = t.N;
        if (e) return ss(e, n);
        var r = t.site;
        return r[1] === n ? r[0] : 1 / 0;
      }
      var fs,
        hs,
        ls,
        ds,
        ps = 1e-6,
        vs = 1e-12;
      function _s(t, n) {
        return n[1] - t[1] || n[0] - t[0];
      }
      function ys(t, n) {
        var e,
          r,
          i,
          o = t.sort(_s).pop();
        for (ds = [], hs = new Array(t.length), fs = new Yu(), ls = new Yu(); ; )
          if (((i = Qu), o && (!i || o[1] < i.y || (o[1] === i.y && o[0] < i.x))))
            (o[0] === e && o[1] === r) || (us(o), (e = o[0]), (r = o[1])), (o = t.pop());
          else {
            if (!i) break;
            as(i.arc);
          }
        if (
          ((function () {
            for (var t, n, e, r, i = 0, o = hs.length; i < o; ++i)
              if ((t = hs[i]) && (r = (n = t.halfedges).length)) {
                var a = new Array(r),
                  u = new Array(r);
                for (e = 0; e < r; ++e) (a[e] = e), (u[e] = Vu(t, ds[n[e]]));
                for (
                  a.sort(function (t, n) {
                    return u[n] - u[t];
                  }),
                    e = 0;
                  e < r;
                  ++e
                )
                  u[e] = n[a[e]];
                for (e = 0; e < r; ++e) n[e] = u[e];
              }
          })(),
          n)
        ) {
          var a = +n[0][0],
            u = +n[0][1],
            s = +n[1][0],
            c = +n[1][1];
          !(function (t, n, e, r) {
            for (var i, o = ds.length; o--; )
              (Wu((i = ds[o]), t, n, e, r) &&
                $u(i, t, n, e, r) &&
                (Math.abs(i[0][0] - i[1][0]) > ps || Math.abs(i[0][1] - i[1][1]) > ps)) ||
                delete ds[o];
          })(a, u, s, c),
            (function (t, n, e, r) {
              var i,
                o,
                a,
                u,
                s,
                c,
                f,
                h,
                l,
                d,
                p,
                v,
                _ = hs.length,
                y = !0;
              for (i = 0; i < _; ++i)
                if ((o = hs[i])) {
                  for (a = o.site, u = (s = o.halfedges).length; u--; ) ds[s[u]] || s.splice(u, 1);
                  for (u = 0, c = s.length; u < c; )
                    (p = (d = Ju(o, ds[s[u]]))[0]),
                      (v = d[1]),
                      (h = (f = Zu(o, ds[s[++u % c]]))[0]),
                      (l = f[1]),
                      (Math.abs(p - h) > ps || Math.abs(v - l) > ps) &&
                        (s.splice(
                          u,
                          0,
                          ds.push(
                            Xu(
                              a,
                              d,
                              Math.abs(p - t) < ps && r - v > ps
                                ? [t, Math.abs(h - t) < ps ? l : r]
                                : Math.abs(v - r) < ps && e - p > ps
                                ? [Math.abs(l - r) < ps ? h : e, r]
                                : Math.abs(p - e) < ps && v - n > ps
                                ? [e, Math.abs(h - e) < ps ? l : n]
                                : Math.abs(v - n) < ps && p - t > ps
                                ? [Math.abs(l - n) < ps ? h : t, n]
                                : null
                            )
                          ) - 1
                        ),
                        ++c);
                  c && (y = !1);
                }
              if (y) {
                var g,
                  m,
                  b,
                  w = 1 / 0;
                for (i = 0, y = null; i < _; ++i)
                  (o = hs[i]) &&
                    (b = (g = (a = o.site)[0] - t) * g + (m = a[1] - n) * m) < w &&
                    ((w = b), (y = o));
                if (y) {
                  var x = [t, n],
                    M = [t, r],
                    k = [e, r],
                    N = [e, n];
                  y.halfedges.push(
                    ds.push(Xu((a = y.site), x, M)) - 1,
                    ds.push(Xu(a, M, k)) - 1,
                    ds.push(Xu(a, k, N)) - 1,
                    ds.push(Xu(a, N, x)) - 1
                  );
                }
              }
              for (i = 0; i < _; ++i) (o = hs[i]) && (o.halfedges.length || delete hs[i]);
            })(a, u, s, c);
        }
        (this.edges = ds), (this.cells = hs), (fs = ls = ds = hs = null);
      }
      function gs(t) {
        return function () {
          return t;
        };
      }
      function ms(t, n, e) {
        (this.target = t), (this.type = n), (this.transform = e);
      }
      function bs(t, n, e) {
        (this.k = t), (this.x = n), (this.y = e);
      }
      (ys.prototype = {
        constructor: ys,
        polygons: function () {
          var t = this.edges;
          return this.cells.map(function (n) {
            var e = n.halfedges.map(function (e) {
              return Zu(n, t[e]);
            });
            return (e.data = n.site.data), e;
          });
        },
        triangles: function () {
          var t = [],
            n = this.edges;
          return (
            this.cells.forEach(function (e, r) {
              if ((o = (i = e.halfedges).length))
                for (
                  var i,
                    o,
                    a,
                    u = e.site,
                    s = -1,
                    c = n[i[o - 1]],
                    f = c.left === u ? c.right : c.left;
                  ++s < o;

                )
                  (a = f),
                    (f = (c = n[i[s]]).left === u ? c.right : c.left),
                    a &&
                      f &&
                      r < a.index &&
                      r < f.index &&
                      ((l = a),
                      (d = f),
                      ((h = u)[0] - d[0]) * (l[1] - h[1]) - (h[0] - l[0]) * (d[1] - h[1]) < 0) &&
                      t.push([u.data, a.data, f.data]);
              var h, l, d;
            }),
            t
          );
        },
        links: function () {
          return this.edges
            .filter(function (t) {
              return t.right;
            })
            .map(function (t) {
              return { source: t.left.data, target: t.right.data };
            });
        },
        find: function (t, n, e) {
          for (var r, i, o = this, a = o._found || 0, u = o.cells.length; !(i = o.cells[a]); )
            if (++a >= u) return null;
          var s = t - i.site[0],
            c = n - i.site[1],
            f = s * s + c * c;
          do {
            (i = o.cells[(r = a)]),
              (a = null),
              i.halfedges.forEach(function (e) {
                var r = o.edges[e],
                  u = r.left;
                if ((u !== i.site && u) || (u = r.right)) {
                  var s = t - u[0],
                    c = n - u[1],
                    h = s * s + c * c;
                  h < f && ((f = h), (a = u.index));
                }
              });
          } while (null !== a);
          return (o._found = r), null == e || f <= e * e ? i.site : null;
        },
      }),
        (bs.prototype = {
          constructor: bs,
          scale: function (t) {
            return 1 === t ? this : new bs(this.k * t, this.x, this.y);
          },
          translate: function (t, n) {
            return (0 === t) & (0 === n)
              ? this
              : new bs(this.k, this.x + this.k * t, this.y + this.k * n);
          },
          apply: function (t) {
            return [t[0] * this.k + this.x, t[1] * this.k + this.y];
          },
          applyX: function (t) {
            return t * this.k + this.x;
          },
          applyY: function (t) {
            return t * this.k + this.y;
          },
          invert: function (t) {
            return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
          },
          invertX: function (t) {
            return (t - this.x) / this.k;
          },
          invertY: function (t) {
            return (t - this.y) / this.k;
          },
          rescaleX: function (t) {
            return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
          },
          rescaleY: function (t) {
            return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
          },
          toString: function () {
            return 'translate(' + this.x + ',' + this.y + ') scale(' + this.k + ')';
          },
        });
      var ws = new bs(1, 0, 0);
      function xs() {
        _t.stopImmediatePropagation();
      }
      function Ms() {
        _t.preventDefault(), _t.stopImmediatePropagation();
      }
      function ks() {
        return !_t.button;
      }
      function Ns() {
        var t,
          n,
          e = this;
        return (
          e instanceof SVGElement
            ? ((t = (e = e.ownerSVGElement || e).width.baseVal.value), (n = e.height.baseVal.value))
            : ((t = e.clientWidth), (n = e.clientHeight)),
          [
            [0, 0],
            [t, n],
          ]
        );
      }
      function As() {
        return this.__zoom || ws;
      }
      function Ts() {
        return (-_t.deltaY * (_t.deltaMode ? 120 : 1)) / 500;
      }
      function Cs() {
        return 'ontouchstart' in this;
      }
      function Ss(t, n, e) {
        var r = t.invertX(n[0][0]) - e[0][0],
          i = t.invertX(n[1][0]) - e[1][0],
          o = t.invertY(n[0][1]) - e[0][1],
          a = t.invertY(n[1][1]) - e[1][1];
        return t.translate(
          i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
          a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a)
        );
      }
      function Es(t, n) {
        var e = ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator'];
        if (!e) {
          if (Array.isArray(t) || (e = Ls(t)) || (n && t && 'number' == typeof t.length)) {
            e && (t = e);
            var r = 0,
              i = function () {};
            return {
              s: i,
              n: function () {
                return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] };
              },
              e: function (t) {
                throw t;
              },
              f: i,
            };
          }
          throw new TypeError(
            'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          );
        }
        var o,
          a = !0,
          u = !1;
        return {
          s: function () {
            e = e.call(t);
          },
          n: function () {
            var t = e.next();
            return (a = t.done), t;
          },
          e: function (t) {
            (u = !0), (o = t);
          },
          f: function () {
            try {
              a || null == e.return || e.return();
            } finally {
              if (u) throw o;
            }
          },
        };
      }
      function Ls(t, n) {
        if (t) {
          if ('string' == typeof t) return zs(t, n);
          var e = Object.prototype.toString.call(t).slice(8, -1);
          return (
            'Object' === e && t.constructor && (e = t.constructor.name),
            'Map' === e || 'Set' === e
              ? Array.from(t)
              : 'Arguments' === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)
              ? zs(t, n)
              : void 0
          );
        }
      }
      function zs(t, n) {
        (null == n || n > t.length) && (n = t.length);
        for (var e = 0, r = new Array(n); e < n; e++) r[e] = t[e];
        return r;
      }
      function Us() {
        var t,
          n = document.getElementById('index-counter'),
          e = document.querySelectorAll('.menu-types-list .badge'),
          r = 0,
          i = {},
          o = Es(data.nodes);
        try {
          for (o.s(); !(t = o.n()).done; ) {
            var a = t.value,
              u = a.hidden,
              s = a.type;
            !0 !== u && ((r += 1), i[s] ? (i[s] += 1) : (i[s] = 1));
          }
        } catch (t) {
          o.e(t);
        } finally {
          o.f();
        }
        var c,
          f = Es(e);
        try {
          for (f.s(); !(c = f.n()).done; ) {
            var h = c.value;
            Ps(h, i[h.previousElementSibling.name] || 0);
          }
        } catch (t) {
          f.e(t);
        } finally {
          f.f();
        }
        Ps(n, r);
      }
      function Ps(t, n) {
        var e,
          r,
          i =
            ((e = t.textContent.split('/', 2)),
            (r = 2),
            (function (t) {
              if (Array.isArray(t)) return t;
            })(e) ||
              (function (t, n) {
                var e =
                  null == t
                    ? null
                    : ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator'];
                if (null != e) {
                  var r,
                    i,
                    o = [],
                    a = !0,
                    u = !1;
                  try {
                    for (
                      e = e.call(t);
                      !(a = (r = e.next()).done) && (o.push(r.value), !n || o.length !== n);
                      a = !0
                    );
                  } catch (t) {
                    (u = !0), (i = t);
                  } finally {
                    try {
                      a || null == e.return || e.return();
                    } finally {
                      if (u) throw i;
                    }
                  }
                  return o;
                }
              })(e, r) ||
              Ls(e, r) ||
              (function () {
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                );
              })()),
          o = i[0],
          a = i[1];
        (o = Number(o)),
          (a = Number(a) || o),
          (t.textContent = n === a ? a : ''.concat(n, '/').concat(a));
      }
      function Is(t, n) {
        (null == n || n > t.length) && (n = t.length);
        for (var e = 0, r = new Array(n); e < n; e++) r[e] = t[e];
        return r;
      }
      bs.prototype,
        (data.nodes = data.nodes.map(function (t) {
          return (t.hidden = !1), (t.isolated = !1), (t.highlighted = !1), t;
        }));
      var Ds = Et('#graph-canvas'),
        js = Ds.node().getBoundingClientRect(),
        Rs = js.width,
        Os = js.height;
      Ds.attr('viewBox', [0, 0, Rs, Os]).attr('preserveAspectRatio', 'xMinYMin meet');
      var qs = (function (t) {
        var n,
          e = 1,
          r = 0.001,
          i = 1 - Math.pow(r, 1 / 300),
          o = 0,
          a = 0.6,
          u = Pr(),
          s = De(f),
          c = v('tick', 'end');
        function f() {
          h(), c.call('tick', n), e < r && (s.stop(), c.call('end', n));
        }
        function h() {
          var n,
            r,
            s = t.length;
          for (
            e += (o - e) * i,
              u.each(function (t) {
                t(e);
              }),
              n = 0;
            n < s;
            ++n
          )
            null == (r = t[n]).fx ? (r.x += r.vx *= a) : ((r.x = r.fx), (r.vx = 0)),
              null == r.fy ? (r.y += r.vy *= a) : ((r.y = r.fy), (r.vy = 0));
        }
        function l() {
          for (var n, e = 0, r = t.length; e < r; ++e) {
            if ((((n = t[e]).index = e), isNaN(n.x) || isNaN(n.y))) {
              var i = 10 * Math.sqrt(e),
                o = e * ai;
              (n.x = i * Math.cos(o)), (n.y = i * Math.sin(o));
            }
            (isNaN(n.vx) || isNaN(n.vy)) && (n.vx = n.vy = 0);
          }
        }
        function d(n) {
          return n.initialize && n.initialize(t), n;
        }
        return (
          null == t && (t = []),
          l(),
          (n = {
            tick: h,
            restart: function () {
              return s.restart(f), n;
            },
            stop: function () {
              return s.stop(), n;
            },
            nodes: function (e) {
              return arguments.length ? ((t = e), l(), u.each(d), n) : t;
            },
            alpha: function (t) {
              return arguments.length ? ((e = +t), n) : e;
            },
            alphaMin: function (t) {
              return arguments.length ? ((r = +t), n) : r;
            },
            alphaDecay: function (t) {
              return arguments.length ? ((i = +t), n) : +i;
            },
            alphaTarget: function (t) {
              return arguments.length ? ((o = +t), n) : o;
            },
            velocityDecay: function (t) {
              return arguments.length ? ((a = 1 - t), n) : 1 - a;
            },
            force: function (t, e) {
              return arguments.length > 1
                ? (null == e ? u.remove(t) : u.set(t, d(e)), n)
                : u.get(t);
            },
            find: function (n, e, r) {
              var i,
                o,
                a,
                u,
                s,
                c = 0,
                f = t.length;
              for (null == r ? (r = 1 / 0) : (r *= r), c = 0; c < f; ++c)
                (a = (i = n - (u = t[c]).x) * i + (o = e - u.y) * o) < r && ((s = u), (r = a));
              return s;
            },
            on: function (t, e) {
              return arguments.length > 1 ? (c.on(t, e), n) : c.on(t);
            },
          })
        );
      })(data.nodes)
        .force(
          'link',
          (function (t) {
            var n,
              e,
              r,
              i,
              o,
              a = ni,
              u = function (t) {
                return 1 / Math.min(i[t.source.index], i[t.target.index]);
              },
              s = Kr(30),
              c = 1;
            function f(r) {
              for (var i = 0, a = t.length; i < c; ++i)
                for (var u, s, f, h, l, d, p, v = 0; v < a; ++v)
                  (s = (u = t[v]).source),
                    (h = (f = u.target).x + f.vx - s.x - s.vx || ti()),
                    (l = f.y + f.vy - s.y - s.vy || ti()),
                    (h *= d = (((d = Math.sqrt(h * h + l * l)) - e[v]) / d) * r * n[v]),
                    (l *= d),
                    (f.vx -= h * (p = o[v])),
                    (f.vy -= l * p),
                    (s.vx += h * (p = 1 - p)),
                    (s.vy += l * p);
            }
            function h() {
              if (r) {
                var u,
                  s,
                  c = r.length,
                  f = t.length,
                  h = Pr(r, a);
                for (u = 0, i = new Array(c); u < f; ++u)
                  ((s = t[u]).index = u),
                    'object' != typeof s.source && (s.source = ei(h, s.source)),
                    'object' != typeof s.target && (s.target = ei(h, s.target)),
                    (i[s.source.index] = (i[s.source.index] || 0) + 1),
                    (i[s.target.index] = (i[s.target.index] || 0) + 1);
                for (u = 0, o = new Array(f); u < f; ++u)
                  (s = t[u]), (o[u] = i[s.source.index] / (i[s.source.index] + i[s.target.index]));
                (n = new Array(f)), l(), (e = new Array(f)), d();
              }
            }
            function l() {
              if (r) for (var e = 0, i = t.length; e < i; ++e) n[e] = +u(t[e], e, t);
            }
            function d() {
              if (r) for (var n = 0, i = t.length; n < i; ++n) e[n] = +s(t[n], n, t);
            }
            return (
              null == t && (t = []),
              (f.initialize = function (t) {
                (r = t), h();
              }),
              (f.links = function (n) {
                return arguments.length ? ((t = n), h(), f) : t;
              }),
              (f.id = function (t) {
                return arguments.length ? ((a = t), f) : a;
              }),
              (f.iterations = function (t) {
                return arguments.length ? ((c = +t), f) : c;
              }),
              (f.strength = function (t) {
                return arguments.length ? ((u = 'function' == typeof t ? t : Kr(+t)), l(), f) : u;
              }),
              (f.distance = function (t) {
                return arguments.length ? ((s = 'function' == typeof t ? t : Kr(+t)), d(), f) : s;
              }),
              f
            );
          })(data.links).id(function (t) {
            return t.id;
          })
        )
        .force(
          'charge',
          (function () {
            var t,
              n,
              e,
              r,
              i = Kr(-30),
              o = 1,
              a = 1 / 0,
              u = 0.81;
            function s(r) {
              var i,
                o = t.length,
                a = Zr(t, ri, ii).visitAfter(f);
              for (e = r, i = 0; i < o; ++i) (n = t[i]), a.visit(h);
            }
            function c() {
              if (t) {
                var n,
                  e,
                  o = t.length;
                for (r = new Array(o), n = 0; n < o; ++n) (e = t[n]), (r[e.index] = +i(e, n, t));
              }
            }
            function f(t) {
              var n,
                e,
                i,
                o,
                a,
                u = 0,
                s = 0;
              if (t.length) {
                for (i = o = a = 0; a < 4; ++a)
                  (n = t[a]) &&
                    (e = Math.abs(n.value)) &&
                    ((u += n.value), (s += e), (i += e * n.x), (o += e * n.y));
                (t.x = i / s), (t.y = o / s);
              } else {
                ((n = t).x = n.data.x), (n.y = n.data.y);
                do {
                  u += r[n.data.index];
                } while ((n = n.next));
              }
              t.value = u;
            }
            function h(t, i, s, c) {
              if (!t.value) return !0;
              var f = t.x - n.x,
                h = t.y - n.y,
                l = c - i,
                d = f * f + h * h;
              if ((l * l) / u < d)
                return (
                  d < a &&
                    (0 === f && (d += (f = ti()) * f),
                    0 === h && (d += (h = ti()) * h),
                    d < o && (d = Math.sqrt(o * d)),
                    (n.vx += (f * t.value * e) / d),
                    (n.vy += (h * t.value * e) / d)),
                  !0
                );
              if (!(t.length || d >= a)) {
                (t.data !== n || t.next) &&
                  (0 === f && (d += (f = ti()) * f),
                  0 === h && (d += (h = ti()) * h),
                  d < o && (d = Math.sqrt(o * d)));
                do {
                  t.data !== n &&
                    ((l = (r[t.data.index] * e) / d), (n.vx += f * l), (n.vy += h * l));
                } while ((t = t.next));
              }
            }
            return (
              (s.initialize = function (n) {
                (t = n), c();
              }),
              (s.strength = function (t) {
                return arguments.length ? ((i = 'function' == typeof t ? t : Kr(+t)), c(), s) : i;
              }),
              (s.distanceMin = function (t) {
                return arguments.length ? ((o = t * t), s) : Math.sqrt(o);
              }),
              (s.distanceMax = function (t) {
                return arguments.length ? ((a = t * t), s) : Math.sqrt(a);
              }),
              (s.theta = function (t) {
                return arguments.length ? ((u = t * t), s) : Math.sqrt(u);
              }),
              s
            );
          })()
        )
        .force(
          'center',
          (function (t, n) {
            var e;
            function r() {
              var r,
                i,
                o = e.length,
                a = 0,
                u = 0;
              for (r = 0; r < o; ++r) (a += (i = e[r]).x), (u += i.y);
              for (a = a / o - t, u = u / o - n, r = 0; r < o; ++r) ((i = e[r]).x -= a), (i.y -= u);
            }
            return (
              null == t && (t = 0),
              null == n && (n = 0),
              (r.initialize = function (t) {
                e = t;
              }),
              (r.x = function (n) {
                return arguments.length ? ((t = +n), r) : t;
              }),
              (r.y = function (t) {
                return arguments.length ? ((n = +t), r) : n;
              }),
              r
            );
          })()
        )
        .force(
          'forceX',
          (function (t) {
            var n,
              e,
              r,
              i = Kr(0.1);
            function o(t) {
              for (var i, o = 0, a = n.length; o < a; ++o) (i = n[o]).vx += (r[o] - i.x) * e[o] * t;
            }
            function a() {
              if (n) {
                var o,
                  a = n.length;
                for (e = new Array(a), r = new Array(a), o = 0; o < a; ++o)
                  e[o] = isNaN((r[o] = +t(n[o], o, n))) ? 0 : +i(n[o], o, n);
              }
            }
            return (
              'function' != typeof t && (t = Kr(null == t ? 0 : +t)),
              (o.initialize = function (t) {
                (n = t), a();
              }),
              (o.strength = function (t) {
                return arguments.length ? ((i = 'function' == typeof t ? t : Kr(+t)), a(), o) : i;
              }),
              (o.x = function (n) {
                return arguments.length ? ((t = 'function' == typeof n ? n : Kr(+n)), a(), o) : t;
              }),
              o
            );
          })()
        )
        .force(
          'forceY',
          (function (t) {
            var n,
              e,
              r,
              i = Kr(0.1);
            function o(t) {
              for (var i, o = 0, a = n.length; o < a; ++o) (i = n[o]).vy += (r[o] - i.y) * e[o] * t;
            }
            function a() {
              if (n) {
                var o,
                  a = n.length;
                for (e = new Array(a), r = new Array(a), o = 0; o < a; ++o)
                  e[o] = isNaN((r[o] = +t(n[o], o, n))) ? 0 : +i(n[o], o, n);
              }
            }
            return (
              'function' != typeof t && (t = Kr(null == t ? 0 : +t)),
              (o.initialize = function (t) {
                (n = t), a();
              }),
              (o.strength = function (t) {
                return arguments.length ? ((i = 'function' == typeof t ? t : Kr(+t)), a(), o) : i;
              }),
              (o.y = function (n) {
                return arguments.length ? ((t = 'function' == typeof n ? n : Kr(+n)), a(), o) : t;
              }),
              o
            );
          })()
        );
      qs
        .force('center')
        .x(0.5 * Rs)
        .y(0.5 * Os),
        (window.updateForces = function () {
          qs
            .force('charge')
            .strength(-Math.abs(graphProperties.attraction_force))
            .distanceMax(graphProperties.attraction_distance_max),
            qs.force('forceX').strength(graphProperties.attraction_vertical),
            qs.force('forceY').strength(graphProperties.attraction_horizontal),
            qs.alpha(1).restart();
        }),
        updateForces(),
        qs.on('tick', function () {
          Fs.links
            .attr('x1', function (t) {
              return t.source.x;
            })
            .attr('y1', function (t) {
              return t.source.y;
            })
            .attr('x2', function (t) {
              return t.target.x;
            })
            .attr('y2', function (t) {
              return t.target.y;
            }),
            Fs.nodes.attr('transform', function (t) {
              return (
                (t.x = Math.max(t.size, Math.min(Rs - t.size, t.x))),
                (t.y = Math.max(t.size, Math.min(Os - t.size, t.y))),
                'translate(' + t.x + ',' + t.y + ')'
              );
            }),
            Et('#load-bar-value').style('flex-basis', 100 * qs.alpha() + '%');
        });
      var Fs = {};
      function Ys(t) {
        var n = Fs.nodes
          .filter(function (t) {
            return !1 === t.hidden;
          })
          .data()
          .map(function (t) {
            return t.id;
          });
        return {
          nodes: Fs.nodes.filter(function (n) {
            return t.includes(n.id);
          }),
          links: Fs.links.filter(function (e) {
            return !(
              (!t.includes(e.source.id) && !t.includes(e.target.id)) ||
              !n.includes(e.source.id) ||
              !n.includes(e.target.id)
            );
          }),
        };
      }
      function Hs(t) {
        var n;
        (n = data.nodes.filter(function (n) {
          if (t.includes(n.id) && !1 === n.hidden) return !0;
        })),
          r.focusMode &&
            (n = n.filter(function (t) {
              if (!0 === t.isolated) return !0;
            })),
          (n = n.map(function (t) {
            return t.id;
          })),
          hideNodeNetwork(n),
          (function (t) {
            var n,
              e = Ws(t);
            try {
              for (e.s(); !(n = e.n()).done; ) {
                var r = n.value;
                Ks.querySelectorAll('[data-index="' + r + '"]').forEach(function (t) {
                  t.style.display = 'none';
                });
              }
            } catch (t) {
              e.e(t);
            } finally {
              e.f();
            }
          })(n),
          Fs.nodes.data(
            Fs.nodes.data().map(function (t) {
              return n.includes(t.id) && (t.hidden = !0), t;
            })
          );
      }
      function Xs(t) {
        var n;
        (n = data.nodes.filter(function (n) {
          if (t.includes(n.id) && !0 === n.hidden) return !0;
        })),
          r.focusMode &&
            (n = n.filter(function (t) {
              if (!0 === t.isolated) return !0;
            })),
          (n = n.map(function (t) {
            return t.id;
          })),
          Fs.nodes.data(
            Fs.nodes.data().map(function (t) {
              return n.includes(t.id) && (t.hidden = !1), t;
            })
          ),
          displayNodeNetwork(n),
          (function (t) {
            var n,
              e = Ws(
                (t = t.filter(function (t) {
                  if (
                    !1 ===
                    data.nodes.find(function (n) {
                      return n.id === t;
                    }).hidden
                  )
                    return !0;
                }))
              );
            try {
              for (e.s(); !(n = e.n()).done; ) {
                var r = n.value;
                Ks.querySelectorAll('[data-index="' + r + '"]').forEach(function (t) {
                  t.style.display = null;
                });
              }
            } catch (t) {
              e.e(t);
            } finally {
              e.f();
            }
          })(n);
      }
      function Bs(t) {
        var n = Ys(t);
        n.nodes.selectAll('circle').style('stroke', 'var(--highlight)'),
          n.links.style('stroke', 'var(--highlight)'),
          (r.highlightedNodes = r.highlightedNodes.concat(t));
      }
      function $s() {
        if (0 !== r.highlightedNodes.length) {
          var t = Ys(r.highlightedNodes);
          t.nodes.selectAll('circle').style('stroke', null),
            t.links.style('stroke', null),
            (r.highlightedNodes = []);
        }
      }
      function Ws(t, n) {
        var e = ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator'];
        if (!e) {
          if (
            Array.isArray(t) ||
            (e = (function (t, n) {
              if (t) {
                if ('string' == typeof t) return Vs(t, n);
                var e = Object.prototype.toString.call(t).slice(8, -1);
                return (
                  'Object' === e && t.constructor && (e = t.constructor.name),
                  'Map' === e || 'Set' === e
                    ? Array.from(t)
                    : 'Arguments' === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)
                    ? Vs(t, n)
                    : void 0
                );
              }
            })(t)) ||
            (n && t && 'number' == typeof t.length)
          ) {
            e && (t = e);
            var r = 0,
              i = function () {};
            return {
              s: i,
              n: function () {
                return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] };
              },
              e: function (t) {
                throw t;
              },
              f: i,
            };
          }
          throw new TypeError(
            'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          );
        }
        var o,
          a = !0,
          u = !1;
        return {
          s: function () {
            e = e.call(t);
          },
          n: function () {
            var t = e.next();
            return (a = t.done), t;
          },
          e: function (t) {
            (u = !0), (o = t);
          },
          f: function () {
            try {
              a || null == e.return || e.return();
            } finally {
              if (u) throw o;
            }
          },
        };
      }
      function Vs(t, n) {
        (null == n || n > t.length) && (n = t.length);
        for (var e = 0, r = new Array(n); e < n; e++) r[e] = t[e];
        return r;
      }
      (Fs.links = Ds.append('g')
        .selectAll('line')
        .data(data.links)
        .enter()
        .append('line')
        .attr('stroke', function (t) {
          return t.color;
        })
        .attr('title', function (t) {
          return t.title;
        })
        .attr('data-source', function (t) {
          return t.source.id;
        })
        .attr('data-target', function (t) {
          return t.target.id;
        })
        .attr('stroke-dasharray', function (t) {
          return ('dash' === t.shape.stroke || 'dotted' === t.shape.stroke) && t.shape.dashInterval;
        })
        .attr('filter', function (t) {
          return 'double' === t.shape.stroke && 'url(#double)';
        })),
        !0 === graphProperties.graph_arrows && Fs.links.attr('marker-end', 'url(#arrow)'),
        (Fs.nodes = Ds.append('g')
          .selectAll('g')
          .data(data.nodes)
          .enter()
          .append('g')
          .attr('data-node', function (t) {
            return t.id;
          })
          .on('click', function (t) {
            openRecord(t.id);
          })),
        (Fs.circles = Fs.nodes
          .append('circle')
          .attr('r', function (t) {
            return t.size;
          })
          .attr('fill', function (t) {
            return t.fill;
          })
          .attr('stroke', function (t) {
            return t.colorStroke;
          })
          .attr('stroke-width', function (t) {
            return t.strokeWidth;
          })
          .call(
            (function () {
              var t,
                n,
                e,
                r,
                i = Ht,
                o = Xt,
                a = Bt,
                u = $t,
                s = {},
                c = v('start', 'drag', 'end'),
                f = 0,
                h = 0;
              function l(t) {
                t.on('mousedown.drag', d)
                  .filter(u)
                  .on('touchstart.drag', y)
                  .on('touchmove.drag', g)
                  .on('touchend.drag touchcancel.drag', m)
                  .style('touch-action', 'none')
                  .style('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');
              }
              function d() {
                if (!r && i.apply(this, arguments)) {
                  var a = b('mouse', o.apply(this, arguments), It, this, arguments);
                  a &&
                    (Et(_t.view).on('mousemove.drag', p, !0).on('mouseup.drag', _, !0),
                    Ot(_t.view),
                    jt(),
                    (e = !1),
                    (t = _t.clientX),
                    (n = _t.clientY),
                    a('start'));
                }
              }
              function p() {
                if ((Rt(), !e)) {
                  var r = _t.clientX - t,
                    i = _t.clientY - n;
                  e = r * r + i * i > h;
                }
                s.mouse('drag');
              }
              function _() {
                Et(_t.view).on('mousemove.drag mouseup.drag', null),
                  qt(_t.view, e),
                  Rt(),
                  s.mouse('end');
              }
              function y() {
                if (i.apply(this, arguments)) {
                  var t,
                    n,
                    e = _t.changedTouches,
                    r = o.apply(this, arguments),
                    a = e.length;
                  for (t = 0; t < a; ++t)
                    (n = b(e[t].identifier, r, Dt, this, arguments)) && (jt(), n('start'));
                }
              }
              function g() {
                var t,
                  n,
                  e = _t.changedTouches,
                  r = e.length;
                for (t = 0; t < r; ++t) (n = s[e[t].identifier]) && (Rt(), n('drag'));
              }
              function m() {
                var t,
                  n,
                  e = _t.changedTouches,
                  i = e.length;
                for (
                  r && clearTimeout(r),
                    r = setTimeout(function () {
                      r = null;
                    }, 500),
                    t = 0;
                  t < i;
                  ++t
                )
                  (n = s[e[t].identifier]) && (jt(), n('end'));
              }
              function b(t, n, e, r, i) {
                var o,
                  u,
                  h,
                  d = e(n, t),
                  p = c.copy();
                if (
                  xt(new Yt(l, 'beforestart', o, t, f, d[0], d[1], 0, 0, p), function () {
                    return (
                      null != (_t.subject = o = a.apply(r, i)) &&
                      ((u = o.x - d[0] || 0), (h = o.y - d[1] || 0), !0)
                    );
                  })
                )
                  return function a(c) {
                    var v,
                      _ = d;
                    switch (c) {
                      case 'start':
                        (s[t] = a), (v = f++);
                        break;
                      case 'end':
                        delete s[t], --f;
                      case 'drag':
                        (d = e(n, t)), (v = f);
                    }
                    xt(
                      new Yt(l, c, o, t, v, d[0] + u, d[1] + h, d[0] - _[0], d[1] - _[1], p),
                      p.apply,
                      p,
                      [c, r, i]
                    );
                  };
              }
              return (
                (l.filter = function (t) {
                  return arguments.length ? ((i = 'function' == typeof t ? t : Ft(!!t)), l) : i;
                }),
                (l.container = function (t) {
                  return arguments.length ? ((o = 'function' == typeof t ? t : Ft(t)), l) : o;
                }),
                (l.subject = function (t) {
                  return arguments.length ? ((a = 'function' == typeof t ? t : Ft(t)), l) : a;
                }),
                (l.touchable = function (t) {
                  return arguments.length ? ((u = 'function' == typeof t ? t : Ft(!!t)), l) : u;
                }),
                (l.on = function () {
                  var t = c.on.apply(c, arguments);
                  return t === c ? l : t;
                }),
                (l.clickDistance = function (t) {
                  return arguments.length ? ((h = (t = +t) * t), l) : Math.sqrt(h);
                }),
                l
              );
            })()
              .on('start', function (t) {
                _t.active || qs.alphaTarget(0.3).restart(), (t.fx = t.x), (t.fy = t.y);
              })
              .on('drag', function (t) {
                (t.fx = _t.x), (t.fy = _t.y);
              })
              .on('end', function (t) {
                _t.active || qs.alphaTarget(1e-4), (t.fx = null), (t.fy = null);
              })
          )
          .on('mouseenter', function (t) {
            if (graphProperties.graph_highlight_on_hover) {
              var n = [t.id],
                e = Fs.links.filter(function (e) {
                  return (
                    (e.source.id !== t.id && e.target.id !== t.id) ||
                    (n.push(e.source.id, e.target.id), !1)
                  );
                }),
                r = Fs.nodes.filter(function (t) {
                  return !n.includes(t.id);
                }),
                i = Fs.links.filter(function (n) {
                  return n.source.id === t.id || n.target.id === t.id;
                });
              Fs.nodes
                .filter(function (t) {
                  return !!n.includes(t.id);
                })
                .selectAll('circle')
                .attr('stroke', function (t) {
                  return t.highlight;
                }),
                i.attr('stroke', function (t) {
                  return t.colorHighlight;
                }),
                r.attr('opacity', 0.5),
                e.attr('stroke-opacity', 0.5);
            }
          })
          .on('mouseout', function () {
            graphProperties.graph_highlight_on_hover &&
              (Fs.nodes.selectAll('circle').attr('stroke', function (t) {
                return t.colorStroke;
              }),
              Fs.links.attr('stroke', function (t) {
                return t.color;
              }),
              Fs.nodes.attr('opacity', 1),
              Fs.links.attr('stroke-opacity', 1));
          })),
        (Fs.labels = Fs.nodes
          .append('text')
          .each(function (t) {
            for (var n = t.label.split(' '), e = Et(this), r = '', i = 0; i < n.length; i++)
              ((r += n[i] + ' ').length < 25 && i !== n.length - 1) ||
                (e.append('tspan').attr('x', 0).attr('dy', '1.2em').text(r.slice(0, -1)), (r = ''));
          })
          .attr('font-size', graphProperties.graph_text_size)
          .attr('x', 0)
          .attr('y', function (t) {
            return t.size;
          })
          .attr('dominant-baseline', 'middle')
          .attr('text-anchor', 'middle')),
        (window.zoomToNode = function (t) {
          var n = Fs.nodes
              .filter(function (n) {
                return n.id === t;
              })
              .datum(),
            e = recordContainer.offsetWidth,
            i = n.x,
            o = n.y;
          (i = Rs / 2 - 2 * i),
            (o = Os / 2 - 2 * o),
            (i += (window.innerWidth - e) / 2),
            (o += window.innerHeight / 2),
            (r.position = { zoom: 2, x: i, y: o }),
            (function () {
              var t = r.position,
                n = t.x,
                e = t.y,
                i = t.zoom;
              Ds.attr(
                'style',
                'transform:translate('.concat(n, 'px, ').concat(e, 'px) scale(').concat(i, ');')
              );
            })();
        }),
        (window.hideNodeNetwork = function (t) {
          var n = Ys(t);
          n.nodes.style('display', 'none'), n.links.style('display', 'none');
        }),
        (window.displayNodeNetwork = function (t) {
          var n = Ys(t);
          n.nodes.style('display', null), n.links.style('display', null);
        }),
        (window.linksDisplayToggle = function (t) {
          t ? Fs.links.style('display', null) : Fs.links.style('display', 'none');
        }),
        (window.labelDisplayToggle = function (t) {
          t ? Fs.labels.style('display', null) : Fs.labels.style('display', 'none');
        }),
        (window.labelHighlight = function (t) {
          var n = Fs.nodes
            .filter(function (n) {
              return t.includes(n.id);
            })
            .select('text');
          (data.nodes = data.nodes.map(function (n) {
            return t.includes(n.id) && (n.highlighted = !0), n;
          })),
            n.style('fill', 'var(--highlight)');
        }),
        (window.updateFontsize = function () {
          Fs.labels.attr('font-size', graphProperties.text_size);
        }),
        (window.labelUnlight = function (t) {
          var n = Fs.nodes
            .filter(function (n) {
              return t.includes(n.id);
            })
            .select('text');
          (data.nodes = data.nodes.map(function (n) {
            return t.includes(n.id) && (n.highlighted = !1), n;
          })),
            n.style('fill', null);
        }),
        (window.labelUnlightAll = function () {
          (data.nodes = data.nodes.map(function (t) {
            return (t.highlighted = !1), t;
          })),
            Fs.labels.style('fill', null);
        }),
        (window.chronosAction = function (t) {
          if (void 0 !== chronos.begin && void 0 !== chronos.end) {
            var n,
              e = [],
              r = [],
              i = (function (t, n) {
                var e = ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator'];
                if (!e) {
                  if (
                    Array.isArray(t) ||
                    (e = (function (t, n) {
                      if (t) {
                        if ('string' == typeof t) return Is(t, n);
                        var e = Object.prototype.toString.call(t).slice(8, -1);
                        return (
                          'Object' === e && t.constructor && (e = t.constructor.name),
                          'Map' === e || 'Set' === e
                            ? Array.from(t)
                            : 'Arguments' === e ||
                              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)
                            ? Is(t, n)
                            : void 0
                        );
                      }
                    })(t)) ||
                    (n && t && 'number' == typeof t.length)
                  ) {
                    e && (t = e);
                    var r = 0,
                      i = function () {};
                    return {
                      s: i,
                      n: function () {
                        return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] };
                      },
                      e: function (t) {
                        throw t;
                      },
                      f: i,
                    };
                  }
                  throw new TypeError(
                    'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                  );
                }
                var o,
                  a = !0,
                  u = !1;
                return {
                  s: function () {
                    e = e.call(t);
                  },
                  n: function () {
                    var t = e.next();
                    return (a = t.done), t;
                  },
                  e: function (t) {
                    (u = !0), (o = t);
                  },
                  f: function () {
                    try {
                      a || null == e.return || e.return();
                    } finally {
                      if (u) throw o;
                    }
                  },
                };
              })(data.nodes);
            try {
              for (i.s(); !(n = i.n()).done; ) {
                var o = n.value;
                void 0 === o.end && (o.end = chronos.end),
                  void 0 === o.begin && (o.begin = chronos.begin),
                  t >= o.begin && t <= o.end ? r.push(o.id) : e.push(o.id);
              }
            } catch (t) {
              i.e(t);
            } finally {
              i.f();
            }
            Hs(e), Xs(r), Us();
          }
        });
      var Zs = document.getElementById('record-container');
      (window.openRecord = function (t) {
        var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
          e = document.getElementById(t);
        if (
          e &&
          (void 0 !== r.openedRecordId &&
            document.getElementById(r.openedRecordId).classList.remove('active'),
          Zs.classList.add('active'),
          Zs.scrollTo({ top: 0 }),
          e.classList.add('active'),
          (r.openedRecordId = t),
          $s(),
          Bs([t]),
          n)
        ) {
          var o = e.querySelector('h1').textContent;
          i.actualiser(t, o);
        }
      }),
        (window.closeRecord = function () {
          Zs.classList.remove('active'),
            document.getElementById(r.openedRecordId).classList.remove('active'),
            (r.openedRecordId = void 0),
            $s();
        }),
        window.addEventListener('DOMContentLoaded', function () {
          var t = window.location.hash;
          if (t) {
            var n = t.substring(1);
            openRecord(n);
          }
        }),
        (window.onpopstate = function (t) {
          if (null !== t.state) {
            var n = t.state.hist,
              e = n[n.length - 1];
            openRecord(e, !1);
          }
        });
      var Js,
        Qs = Ws(document.querySelectorAll('[data-sort]'));
      try {
        var Gs = function () {
          var t = Js.value,
            n = t.querySelectorAll('.sort-box'),
            e = n[0],
            r = n[1],
            i = t.querySelector('.sort-btn'),
            o = !0;
          i.addEventListener('click', function () {
            o
              ? ((i.textContent = 'Z-A'),
                e.classList.remove('active'),
                r.classList.add('active'),
                (o = !1))
              : ((i.textContent = 'A-Z'),
                e.classList.add('active'),
                r.classList.remove('active'),
                (o = !0));
          });
        };
        for (Qs.s(); !(Js = Qs.n()).done; ) Gs();
      } catch (t) {
        Qs.e(t);
      } finally {
        Qs.f();
      }
      var Ks = document.getElementById('index'),
        tc = e(691),
        nc = e.n(tc),
        ec = document.getElementById('search'),
        rc = document.getElementById('search-result-list'),
        ic = [],
        oc = 0;
      function ac() {
        rc.childNodes[oc].classList.add('outline');
      }
      function uc() {
        rc.childNodes[oc].classList.remove('outline');
      }
      function sc() {
        (r.position.zoom += 0.3), r.position.zoom >= 3 && (r.position.zoom = 3), fc();
      }
      function cc() {
        (r.position.zoom -= 0.3), r.position.zoom <= 1 && (r.position.zoom = 1), fc();
      }
      function fc() {
        var t = r.position,
          n = t.x,
          e = t.y,
          i = t.zoom;
        Ds.attr(
          'style',
          'transform:translate('.concat(n, 'px, ').concat(e, 'px) scale(').concat(i, ');')
        );
      }
      (ec.value = ''),
        ec.addEventListener('focus', function () {
          var t = new (nc())(data.nodes, { includeScore: !1, keys: ['label'] });
          ec.addEventListener('input', function () {
            if (((rc.innerHTML = ''), (oc = 0), (ic = []), '' !== ec.value)) {
              (ic = t.search(ec.value)), console.log(ic);
              for (
                var n = function (t) {
                    var n = ic[t];
                    if (void 0 === n) return 'break';
                    (r = document.createElement('li')).classList.add('search-result-item'),
                      (r.innerHTML = '<span class="record-type-point" style="color:var(--n_'
                        .concat(n.item.type, ')">⬤</span>\n            <span>')
                        .concat(n.item.label, '</span>')),
                      rc.appendChild(r),
                      0 === t && ac(),
                      r.addEventListener('click', function () {
                        openRecord(n.item.id);
                      });
                  },
                  e = 0;
                e < 5;
                e++
              ) {
                var r;
                if ('break' === n(e)) break;
              }
            }
          });
        }),
        document.addEventListener('keydown', function (t) {
          if (0 !== ic.length)
            switch (t.key) {
              case 'ArrowUp':
                if ((t.preventDefault(), 0 === oc)) return void ec.focus();
                uc(), oc--, ac();
                break;
              case 'ArrowDown':
                if ((t.preventDefault(), 4 === oc || oc === ic.length - 1)) return;
                uc(), oc++, ac(), 1 === oc && ec.blur();
                break;
              case 'Enter':
                t.preventDefault(), openRecord(ic[oc].item.id), ec.blur();
            }
        }),
        Ds.call(
          (function () {
            var t,
              n,
              e = ks,
              r = Ns,
              i = Ss,
              o = Ts,
              a = Cs,
              u = [0, 1 / 0],
              s = [
                [-1 / 0, -1 / 0],
                [1 / 0, 1 / 0],
              ],
              c = 250,
              f = ge,
              h = [],
              l = v('start', 'zoom', 'end'),
              d = 500,
              p = 0;
            function _(t) {
              t.property('__zoom', As)
                .on('wheel.zoom', M)
                .on('mousedown.zoom', k)
                .on('dblclick.zoom', N)
                .filter(a)
                .on('touchstart.zoom', A)
                .on('touchmove.zoom', T)
                .on('touchend.zoom touchcancel.zoom', C)
                .style('touch-action', 'none')
                .style('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');
            }
            function y(t, n) {
              return (n = Math.max(u[0], Math.min(u[1], n))) === t.k ? t : new bs(n, t.x, t.y);
            }
            function g(t, n, e) {
              var r = n[0] - e[0] * t.k,
                i = n[1] - e[1] * t.k;
              return r === t.x && i === t.y ? t : new bs(t.k, r, i);
            }
            function m(t) {
              return [(+t[0][0] + +t[1][0]) / 2, (+t[0][1] + +t[1][1]) / 2];
            }
            function b(t, n, e) {
              t.on('start.zoom', function () {
                w(this, arguments).start();
              })
                .on('interrupt.zoom end.zoom', function () {
                  w(this, arguments).end();
                })
                .tween('zoom', function () {
                  var t = this,
                    i = arguments,
                    o = w(t, i),
                    a = r.apply(t, i),
                    u = e || m(a),
                    s = Math.max(a[1][0] - a[0][0], a[1][1] - a[0][1]),
                    c = t.__zoom,
                    h = 'function' == typeof n ? n.apply(t, i) : n,
                    l = f(c.invert(u).concat(s / c.k), h.invert(u).concat(s / h.k));
                  return function (t) {
                    if (1 === t) t = h;
                    else {
                      var n = l(t),
                        e = s / n[2];
                      t = new bs(e, u[0] - n[0] * e, u[1] - n[1] * e);
                    }
                    o.zoom(null, t);
                  };
                });
            }
            function w(t, n) {
              for (var e, r = 0, i = h.length; r < i; ++r) if ((e = h[r]).that === t) return e;
              return new x(t, n);
            }
            function x(t, n) {
              (this.that = t),
                (this.args = n),
                (this.index = -1),
                (this.active = 0),
                (this.extent = r.apply(t, n));
            }
            function M() {
              if (e.apply(this, arguments)) {
                var t = w(this, arguments),
                  n = this.__zoom,
                  r = Math.max(u[0], Math.min(u[1], n.k * Math.pow(2, o.apply(this, arguments)))),
                  a = It(this);
                if (t.wheel)
                  (t.mouse[0][0] === a[0] && t.mouse[0][1] === a[1]) ||
                    (t.mouse[1] = n.invert((t.mouse[0] = a))),
                    clearTimeout(t.wheel);
                else {
                  if (n.k === r) return;
                  (t.mouse = [a, n.invert(a)]), We(this), t.start();
                }
                Ms(),
                  (t.wheel = setTimeout(c, 150)),
                  t.zoom('mouse', i(g(y(n, r), t.mouse[0], t.mouse[1]), t.extent, s));
              }
              function c() {
                (t.wheel = null), t.end();
              }
            }
            function k() {
              if (!n && e.apply(this, arguments)) {
                var t = w(this, arguments),
                  r = Et(_t.view).on('mousemove.zoom', c, !0).on('mouseup.zoom', f, !0),
                  o = It(this),
                  a = _t.clientX,
                  u = _t.clientY;
                Ot(_t.view), xs(), (t.mouse = [o, this.__zoom.invert(o)]), We(this), t.start();
              }
              function c() {
                if ((Ms(), !t.moved)) {
                  var n = _t.clientX - a,
                    e = _t.clientY - u;
                  t.moved = n * n + e * e > p;
                }
                t.zoom(
                  'mouse',
                  i(g(t.that.__zoom, (t.mouse[0] = It(t.that)), t.mouse[1]), t.extent, s)
                );
              }
              function f() {
                r.on('mousemove.zoom mouseup.zoom', null), qt(_t.view, t.moved), Ms(), t.end();
              }
            }
            function N() {
              if (e.apply(this, arguments)) {
                var t = this.__zoom,
                  n = It(this),
                  o = t.invert(n),
                  a = t.k * (_t.shiftKey ? 0.5 : 2),
                  u = i(g(y(t, a), n, o), r.apply(this, arguments), s);
                Ms(),
                  c > 0
                    ? Et(this).transition().duration(c).call(b, u, n)
                    : Et(this).call(_.transform, u);
              }
            }
            function A() {
              if (e.apply(this, arguments)) {
                var n,
                  r,
                  i,
                  o,
                  a = w(this, arguments),
                  u = _t.changedTouches,
                  s = u.length;
                for (xs(), r = 0; r < s; ++r)
                  (o = [
                    (o = Dt(this, u, (i = u[r]).identifier)),
                    this.__zoom.invert(o),
                    i.identifier,
                  ]),
                    a.touch0 ? a.touch1 || (a.touch1 = o) : ((a.touch0 = o), (n = !0));
                if (t && ((t = clearTimeout(t)), !a.touch1))
                  return (
                    a.end(), void ((o = Et(this).on('dblclick.zoom')) && o.apply(this, arguments))
                  );
                n &&
                  ((t = setTimeout(function () {
                    t = null;
                  }, d)),
                  We(this),
                  a.start());
              }
            }
            function T() {
              var n,
                e,
                r,
                o,
                a = w(this, arguments),
                u = _t.changedTouches,
                c = u.length;
              for (Ms(), t && (t = clearTimeout(t)), n = 0; n < c; ++n)
                (r = Dt(this, u, (e = u[n]).identifier)),
                  a.touch0 && a.touch0[2] === e.identifier
                    ? (a.touch0[0] = r)
                    : a.touch1 && a.touch1[2] === e.identifier && (a.touch1[0] = r);
              if (((e = a.that.__zoom), a.touch1)) {
                var f = a.touch0[0],
                  h = a.touch0[1],
                  l = a.touch1[0],
                  d = a.touch1[1],
                  p = (p = l[0] - f[0]) * p + (p = l[1] - f[1]) * p,
                  v = (v = d[0] - h[0]) * v + (v = d[1] - h[1]) * v;
                (e = y(e, Math.sqrt(p / v))),
                  (r = [(f[0] + l[0]) / 2, (f[1] + l[1]) / 2]),
                  (o = [(h[0] + d[0]) / 2, (h[1] + d[1]) / 2]);
              } else {
                if (!a.touch0) return;
                (r = a.touch0[0]), (o = a.touch0[1]);
              }
              a.zoom('touch', i(g(e, r, o), a.extent, s));
            }
            function C() {
              var t,
                e,
                r = w(this, arguments),
                i = _t.changedTouches,
                o = i.length;
              for (
                xs(),
                  n && clearTimeout(n),
                  n = setTimeout(function () {
                    n = null;
                  }, d),
                  t = 0;
                t < o;
                ++t
              )
                (e = i[t]),
                  r.touch0 && r.touch0[2] === e.identifier
                    ? delete r.touch0
                    : r.touch1 && r.touch1[2] === e.identifier && delete r.touch1;
              r.touch1 && !r.touch0 && ((r.touch0 = r.touch1), delete r.touch1),
                r.touch0 ? (r.touch0[1] = this.__zoom.invert(r.touch0[0])) : r.end();
            }
            return (
              (_.transform = function (t, n) {
                var e = t.selection ? t.selection() : t;
                e.property('__zoom', As),
                  t !== e
                    ? b(t, n)
                    : e.interrupt().each(function () {
                        w(this, arguments)
                          .start()
                          .zoom(null, 'function' == typeof n ? n.apply(this, arguments) : n)
                          .end();
                      });
              }),
              (_.scaleBy = function (t, n) {
                _.scaleTo(t, function () {
                  var t = this.__zoom.k,
                    e = 'function' == typeof n ? n.apply(this, arguments) : n;
                  return t * e;
                });
              }),
              (_.scaleTo = function (t, n) {
                _.transform(t, function () {
                  var t = r.apply(this, arguments),
                    e = this.__zoom,
                    o = m(t),
                    a = e.invert(o),
                    u = 'function' == typeof n ? n.apply(this, arguments) : n;
                  return i(g(y(e, u), o, a), t, s);
                });
              }),
              (_.translateBy = function (t, n, e) {
                _.transform(t, function () {
                  return i(
                    this.__zoom.translate(
                      'function' == typeof n ? n.apply(this, arguments) : n,
                      'function' == typeof e ? e.apply(this, arguments) : e
                    ),
                    r.apply(this, arguments),
                    s
                  );
                });
              }),
              (_.translateTo = function (t, n, e) {
                _.transform(t, function () {
                  var t = r.apply(this, arguments),
                    o = this.__zoom,
                    a = m(t);
                  return i(
                    ws
                      .translate(a[0], a[1])
                      .scale(o.k)
                      .translate(
                        'function' == typeof n ? -n.apply(this, arguments) : -n,
                        'function' == typeof e ? -e.apply(this, arguments) : -e
                      ),
                    t,
                    s
                  );
                });
              }),
              (x.prototype = {
                start: function () {
                  return (
                    1 == ++this.active && ((this.index = h.push(this) - 1), this.emit('start')),
                    this
                  );
                },
                zoom: function (t, n) {
                  return (
                    this.mouse && 'mouse' !== t && (this.mouse[1] = n.invert(this.mouse[0])),
                    this.touch0 && 'touch' !== t && (this.touch0[1] = n.invert(this.touch0[0])),
                    this.touch1 && 'touch' !== t && (this.touch1[1] = n.invert(this.touch1[0])),
                    (this.that.__zoom = n),
                    this.emit('zoom'),
                    this
                  );
                },
                end: function () {
                  return (
                    0 == --this.active &&
                      (h.splice(this.index, 1), (this.index = -1), this.emit('end')),
                    this
                  );
                },
                emit: function (t) {
                  xt(new ms(_, t, this.that.__zoom), l.apply, l, [t, this.that, this.args]);
                },
              }),
              (_.wheelDelta = function (t) {
                return arguments.length ? ((o = 'function' == typeof t ? t : gs(+t)), _) : o;
              }),
              (_.filter = function (t) {
                return arguments.length ? ((e = 'function' == typeof t ? t : gs(!!t)), _) : e;
              }),
              (_.touchable = function (t) {
                return arguments.length ? ((a = 'function' == typeof t ? t : gs(!!t)), _) : a;
              }),
              (_.extent = function (t) {
                return arguments.length
                  ? ((r =
                      'function' == typeof t
                        ? t
                        : gs([
                            [+t[0][0], +t[0][1]],
                            [+t[1][0], +t[1][1]],
                          ])),
                    _)
                  : r;
              }),
              (_.scaleExtent = function (t) {
                return arguments.length ? ((u[0] = +t[0]), (u[1] = +t[1]), _) : [u[0], u[1]];
              }),
              (_.translateExtent = function (t) {
                return arguments.length
                  ? ((s[0][0] = +t[0][0]),
                    (s[1][0] = +t[1][0]),
                    (s[0][1] = +t[0][1]),
                    (s[1][1] = +t[1][1]),
                    _)
                  : [
                      [s[0][0], s[0][1]],
                      [s[1][0], s[1][1]],
                    ];
              }),
              (_.constrain = function (t) {
                return arguments.length ? ((i = t), _) : i;
              }),
              (_.duration = function (t) {
                return arguments.length ? ((c = +t), _) : c;
              }),
              (_.interpolate = function (t) {
                return arguments.length ? ((f = t), _) : f;
              }),
              (_.on = function () {
                var t = l.on.apply(l, arguments);
                return t === l ? _ : t;
              }),
              (_.clickDistance = function (t) {
                return arguments.length ? ((p = (t = +t) * t), _) : Math.sqrt(p);
              }),
              _
            );
          })().on('zoom', function () {
            if (null !== _t.sourceEvent)
              switch (_t.sourceEvent.type) {
                case 'wheel':
                  _t.sourceEvent.deltaY >= 0 ? cc() : sc();
                  break;
                case 'mousemove':
                  (r.position.x += _t.sourceEvent.movementX),
                    (r.position.y += _t.sourceEvent.movementY),
                    fc();
              }
            else sc();
          })
        ),
        (window.zoomMore = sc),
        (window.zoomLess = cc),
        (window.zoomReset = function () {
          (r.position.zoom = 1), (r.position.x = 0), (r.position.y = 0), fc();
        }),
        e(490);
      var hc = document.getElementById('chronos-form'),
        lc = hc.querySelector('[name="chronos_range"]');
      window.toogleChronos = function (t) {
        t
          ? (hc.classList.add('active'), chronosAction(lc.valueAsNumber))
          : (hc.classList.remove('active'),
            Xs(
              data.nodes.map(function (t) {
                return t.id;
              })
            ),
            Us());
      };
      var dc = document.getElementById('chronos-ticks');
      function pc() {
        var t = Math.round(hc.offsetWidth / 100),
          n = Math.round((chronos.end - chronos.begin) / t);
        dc.setAttribute('style', '--list-length: '.concat(t + 1, ';')),
          (dc.innerHTML = ''),
          dc.insertAdjacentHTML(
            'beforeend',
            '<option value="'.concat(chronos.begin, '">').concat(vc(chronos.begin), '</option>')
          );
        for (var e = 1; e <= t; e++)
          e !== t
            ? dc.insertAdjacentHTML(
                'beforeend',
                '<option value="'
                  .concat(chronos.begin + n * e, '">')
                  .concat(vc(chronos.begin + n * e), '</option>')
              )
            : dc.insertAdjacentHTML(
                'beforeend',
                '<option value="'.concat(chronos.end, '">').concat(vc(chronos.end), '</option>')
              );
      }
      function vc(t) {
        return new Date(1e3 * t).toLocaleDateString(graphProperties.lang);
      }
      pc(),
        window.addEventListener('resize', pc),
        (window.filter = function (t, n, e) {
          (n = n.split(',').map(function (t) {
            return Number(t);
          })),
            !0 === t ? (Xs(n), (e.checked = !0)) : (Hs(n), (e.checked = !1)),
            Us(),
            console.log(!1);
        });
    })();
})();
