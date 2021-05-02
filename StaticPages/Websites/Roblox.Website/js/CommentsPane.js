// CommentsPane.js
var Roblox = Roblox || {};
Roblox.CommentsPane = (function () {
	var o = function (n) {
			$.ajax({
				type: 'POST',
				url: '/API/Comments.ashx?rqtype=deleteComment&commentID=' + n,
				contentType: 'application/json; charset=utf-8',
				success: function () {
					$('.Comments [data-comment-id=' + n + ']').parents('.Comment');
				},
				error: function () {},
			});
		},
		e = function (n) {
			n == '01'
				? Roblox.GenericConfirmation.open({
						titleText: Roblox.CommentsPane.Resources.emailVerifiedABTitle,
						bodyContent: Roblox.CommentsPane.Resources.emailVerifiedABMessage,
						onAccept: function () {
							window.location.href = '/my/account?confirmemail=1';
						},
						acceptColor: Roblox.GenericConfirmation.blue,
						acceptText: Roblox.CommentsPane.Resources.accept,
						declineText: Roblox.CommentsPane.Resources.decline,
						allowHtmlContentInBody: !0,
				  })
				: ($('.AjaxCommentsContainer textarea').addClass('hint-text').val(n), $('#CharsRemaining').html(''));
		},
		s = function () {
			$.ajax({
				type: 'POST',
				url: '/API/Comments.ashx?rqtype=makeComment&assetID=' + $('.Comments').attr('data-asset-id'),
				data: $('.CommentText textarea').val(),
				contentType: 'application/json; charset=utf-8',
				success: function (n) {
					typeof n.ID != 'undefined'
						? ($('.AjaxCommentsContainer textarea').addClass('hint-text').val(Roblox.CommentsPane.Resources.defaultMessage),
						  $('.Comments').prepend(t(n, !1)),
						  Roblox.Widgets.AvatarImage.load($('.Comments [data-comment-id=' + n.ID + '] .roblox-avatar-image')))
						: typeof n.errormsg != 'undefined'
						? e(n.errormsg)
						: $('.AjaxCommentsContainer textarea').addClass('hint-text').val(n),
						$('#CharsRemaining').html('');
				},
			});
		},
		t = function (n, t) {
			if (Roblox.CommentsPane.FilterIsEnabled && Roblox.CommentsPane.FilterCleanExistingComments && i(n.Content)) return '';
			var r = $('.CommentsItemTemplate').clone();
			return (
				t || r.find('.Actions').remove(),
				r.find('.Comment').attr('data-comment-id', n.ID),
				r
					.find('.ByLine a')
					.text(n.Author)
					.attr('href', '/User.aspx?id=' + n.AuthorID),
				r.find('.Avatar').addClass('roblox-avatar-image').attr('data-user-id', n.AuthorID).html(''),
				r.find('.Actions [data-comment-id]').attr('data-comment-id', n.ID),
				n.AuthorOwnsAsset != null && n.AuthorOwnsAsset == !0 && r.find('.UserOwnsAsset').css('display', 'inline-block'),
				r.find(),
				(r = r.html()),
				(r = r.replace('%CommentID', n.ID)),
				(r = r.replace('%CommentContent', n.Content)),
				(r = r.replace('%CommentCreated', n.Date)),
				(r = r.replace('%PageURL', encodeURIComponent(window.location.href)))
			);
		},
		c = function (n) {
			var u, i, r;
			(n = n == undefined ? 0 : n),
				(u = $('.Comments').attr('data-asset-id')),
				(i = $('.Comments')),
				i.find('.empty,.more').remove(),
				i.append($('<div class="loading"></div>')),
				(r = Math.floor(Math.random() * 9001)),
				$.ajax({
					type: 'GET',
					url: '/API/Comments.ashx?rqtype=getComments&assetID=' + u + '&startIndex=' + n + '&cachebuster=' + r,
					contentType: 'application/json; charset=utf-8',
					success: function (n) {
						var f = n.data,
							e,
							r,
							u;
						i.find('.loading,.empty,.more').remove();
						for (e in f) i.append(t(f[e], n.isMod));
						f.length == 0 && i.append($('<div class="empty"' + Roblox.CommentsPane.Resources.noCommentsFound + '</div>')),
							(r = $('.Comments .Comment').length),
							r < n.totalCount &&
								((u = $(
									'<div class="more"><span class="btn-control btn-control-small">' +
										Roblox.CommentsPane.Resources.moreComments +
										'</span></div>',
								)),
								u.find('span').click(function () {
									Roblox.CommentsPane.getComments(r);
								}),
								i.append(u)),
							Roblox.require('Widgets.AvatarImage', function (n) {
								n.populate();
							}),
							$('.Comments .Actions a').each(function (n, t) {
								(t = $(t)),
									t.click(function () {
										Roblox.CommentsPane.deleteComment(t.attr('data-comment-id')), t.parents('.Comment').remove();
									});
							});
					},
					error: function () {
						$('.Comments')
							.find('.loading,.empty,.more')
							.remove()
							.append($('<div class="empty">' + Roblox.CommentsPane.Resources.sorrySomethingWentWrong + '</div>'));
					},
				});
		},
		h = function (n, t, i) {
			if (((i = typeof i == 'undefined' ? '' : i), i !== '')) {
				var r = n.split(i).length - 1;
				return r <= t;
			}
			return n.length <= t;
		},
		r = function (n, t, i) {
			if (((i = typeof i == 'undefined' ? '' : i), i !== '')) {
				var f = n.split(i),
					e = f.length,
					u = '',
					r;
				if (e > t) for (r = 0; r < e; ++r) (u += f[r]), r < t && (u += i);
				n = u;
			} else n = n.substr(0, t);
			return n;
		},
		n = function (n, t, i, r) {
			(r = typeof r == 'undefined' ? !1 : r),
				(i = typeof i == 'undefined' ? !0 : i),
				r && n.empty(),
				n.append(t + ' '),
				i ? n.hide() : n.show();
		},
		f = function (n, t) {
			$('#CharsRemaining').html(Math.max(0, Math.min(t, t - n.length)) + Roblox.CommentsPane.Resources.charactersRemaining);
		},
		i = function (n) {
			return new RegExp(Roblox.CommentsPane.FilterRegex).test(n.replace(/(\r\n|\n|\r|<br\/>)/gm, '')) ? !0 : !1;
		},
		u = function () {
			n($('#commentPaneErrorMessage'), '', !0, !0);
			$('.AjaxCommentsContainer textarea').on('input propertychange', function () {
				var u = $('.AjaxCommentsContainer textarea')[0],
					e = $('#commentPaneErrorMessage'),
					i = Roblox.CommentsPane.Limits,
					t;
				for (n(e, '', !0, !0), t = 0; t < i.length; ++t)
					h(u.value, i[t].limit, i[t].character) || ((u.value = r(u.value, i[t].limit, i[t].character)), n(e, i[t].message, !1)),
						typeof i[t].character == 'undefined' && f(u.value, i[t].limit);
			});
			$('.AjaxCommentsContainer .roblox-comment-button').click(function () {
				var t = $('.AjaxCommentsContainer textarea').val();
				if (
					t != '' &&
					t != ' ' &&
					t != 'Write a comment!' &&
					t !=
						Roblox.CommentsPane.Resources.floodCheckString +
							$('#AjaxCommentsPaneData').attr('data-comments-floodcheck') +
							Roblox.CommentsPane.Resources.seconds
				) {
					if (Roblox.CommentsPane.FilterIsEnabled && i(t)) {
						Roblox.GenericModal.open(
							Roblox.CommentsPane.Resources.linksNotAllowedTitle,
							'/images/Icons/img-alert.png',
							Roblox.CommentsPane.Resources.linksNotAllowedMessage,
						);
						return;
					}
					Roblox.CommentsPane.makeComment(), n($('#commentPaneErrorMessage'), '', !0, !0);
				}
			}),
				$('.AjaxCommentsContainer textarea').focus(function () {
					var n = $(this);
					n.hasClass('hint-text') && ((this.value = ''), n.removeClass('hint-text'));
				}),
				$('.AjaxCommentsContainer .Buttons').click(function () {
					var n = $('.AjaxCommentsContainer textarea');
					n.hasClass('hint-text') && (n.val(''), n.removeClass('hint-text'), n.focus());
				});
		};
	return { initialize: u, deleteComment: o, getComments: c, makeComment: s };
})();
