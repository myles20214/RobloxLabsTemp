// AdsHelper.js
var Roblox = Roblox || {};
(Roblox.AdsHelper = Roblox.AdsHelper || {}),
	(Roblox.AdsHelper.AdRefresher = (function () {
		var n = [];
		return (
			(this._Refresh = function () {
				var i = !1,
					r,
					t;
				for (id in n) {
					if (((r = '#' + n[id] + ' [data-js-adtype]'), (t = $(r)), typeof t == 'undefined')) return;
					t.attr('data-js-adtype') === 'iframead' ? _iFrameRefresh(t) : t.attr('data-js-adtype') === 'gptAd' && (i = !0);
				}
				i &&
					googletag.cmd.push(function () {
						googletag.pubads().refresh();
					});
			}),
			(this._iFrameRefresh = function (n) {
				var i = n.attr('src'),
					r,
					u,
					t;
				typeof i == 'string' &&
					((r = i.indexOf('?') < 0 ? '?' : '&'),
					(u = i + r + 'nocache=' + new Date().getMilliseconds().toString()),
					typeof n[0] != 'undefined') &&
					((t = n[0].contentDocument),
					t === undefined && (t = n[0].contentWindow),
					t.location.href !== 'about:blank' && t.location.replace(u));
			}),
			{
				registerAd: function (t) {
					n.push(t);
				},
				refreshAds: function () {
					_Refresh();
				},
			}
		);
	})());
