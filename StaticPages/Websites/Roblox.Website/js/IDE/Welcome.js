// IDE/Welcome.js
$(function () {
	function t(n) {
		var r = '/ide/placelist',
			i,
			t;
		return n && ((i = $('div.place').length), (t = '?startRow=' + i), (r += t)), r;
	}
	function n(n, t) {
		$.ajax({
			url: t,
			cache: !1,
			dataType: 'html',
			success: function (t) {
				n.remove();
				var i = $('#AssetList');
				i.append($(t)),
					$(t).animate({ opacity: 1 }, 'fast'),
					$('.place').unbind('click'),
					$('.place').click(function () {
						$(this).hasClass('place-selected')
							? ($(this).removeClass('place-selected'), $('div#ButtonRow').hide())
							: ($('.place.place-selected').removeClass('place-selected'),
							  $(this).addClass('place-selected'),
							  $('div#ButtonRow').show());
					}),
					$('.place a').removeAttr('href');
			},
		});
	}
	$(window).resize(function () {
		var n = $('.main div.welcome-content-area:visible');
		$(window).height() < n.height() ? $('.navbar').height(n.height()) : $('.navbar').height($(window).height() - 124),
			n.height($(window).height() - 170);
	}),
		$('.navbar').height($(window).height() - 124),
		$('ul.filelist li a').each(function () {
			this.innerHTML = fitStringToWidthSafe($(this).text(), $('.navlist li p').width());
		}),
		$('#PublishedProjects').length > 0 ? $('#MyProjects').addClass('navselected') : $('.navlist li').first().addClass('navselected'),
		$('ul.filelist li a').click(function () {
			Roblox.Client.isIDE()
				? window.external.OpenRecentFile($(this).attr('js-data-file'))
				: Roblox.GenericModal.open(
						Roblox.IDEWelcome.Resources.openProject,
						'/images/Icons/img-alert.png',
						Roblox.IDEWelcome.Resources.openProjectText +
							" <a target='_blank' href='http://wiki.roblox.com/index.php/Studio'>" +
							Roblox.IDEWelcome.Resources.robloxStudio +
							'</a>.',
				  );
		}),
		$('#header-signup').click(function () {
			window.open('/Login/NewAge.aspx');
		}),
		$('#HeaderHome').click(function () {
			window.location = '/Home/Default.aspx';
		}),
		$('#MyProjects').click(function () {
			$('#TemplatesView').hide(),
				$('#MyProjectsView').show(),
				$('.navlist li.navselected').removeClass('navselected'),
				$(this).addClass('navselected');
		}),
		$('#NewProject').click(function () {
			$('#TemplatesView').show(),
				$('#MyProjectsView').hide(),
				$('.navlist li.navselected').removeClass('navselected'),
				$(this).addClass('navselected');
		}),
		$('.place').click(function () {
			$(this).hasClass('place-selected')
				? ($(this).removeClass('place-selected'), $('div#ButtonRow').hide())
				: ($('.place.place-selected').removeClass('place-selected'), $(this).addClass('place-selected'), $('div#ButtonRow').show());
		}),
		$('.place a').removeAttr('href'),
		$('ul.navlist li').last().addClass('lastnav'),
		$('#EditButton').click(function () {
			var t, n;
			$(this).hasClass('btn-disabled-primary') ||
				($('#BuildButton, #EditButton').addClass('btn-disabled-primary'),
				$('#CollapseButton').addClass('btn-disabled-negative'),
				(t = $('.place.place-selected')),
				Roblox.Client.isIDE()
					? ((n = t.attr('data-placeid')), (window.play_placeId = n), window.editGameInStudio(n))
					: Roblox.GenericModal.open(
							Roblox.IDEWelcome.Resources.editPlace,
							'/images/Icons/img-alert.png',
							Roblox.IDEWelcome.Resources.toEdit +
								t.find('p').text() +
								Roblox.IDEWelcome.Resources.openPage +
								"<a target='_blank' href='http://wiki.roblox.com/index.php/Studio'>" +
								Roblox.IDEWelcome.Resources.robloxStudio +
								'</a>.',
					  ),
				$('#BuildButton').removeClass('btn-disabled-primary'),
				$('#EditButton').removeClass('btn-disabled-primary'),
				$('#CollapseButton').removeClass('btn-disabled-negative'),
				$('#CollapseButton').trigger('click'));
		}),
		$('#BuildButton').click(function () {
			var n, i, t;
			$(this).hasClass('btn-disabled-primary') ||
				($('#BuildButton, #EditButton').addClass('btn-disabled-primary'),
				$('#CollapseButton').addClass('btn-disabled-negative'),
				(n = $('.place.place-selected')),
				Roblox.Client.isIDE()
					? ((i = n.attr('data-active') == 'True'),
					  i
							? ((t = n.attr('data-placeid')), (window.play_placeId = t), buildGameInStudio(t))
							: Roblox.GenericModal.open(
									Roblox.IDEWelcome.Resources.placeInactive,
									'/images/Icons/img-alert.png',
									Roblox.IDEWelcome.Resources.toBuild + n.find('p').text() + Roblox.IDEWelcome.Resources.activate,
							  ))
					: Roblox.GenericModal.open(
							Roblox.IDEWelcome.Resources.buildPlace,
							'/images/Icons/img-alert.png',
							Roblox.IDEWelcome.Resources.toBuild +
								n.find('p').text() +
								Roblox.IDEWelcome.Resources.openPage +
								"<a target='_blank' href='http://wiki.roblox.com/index.php/Studio'>" +
								Roblox.IDEWelcome.Resources.robloxStudio +
								'</a>.',
					  ),
				$('#BuildButton').removeClass('btn-disabled-primary'),
				$('#EditButton').removeClass('btn-disabled-primary'),
				$('#CollapseButton').removeClass('btn-disabled-negative'),
				$('#CollapseButton').trigger('click'));
		}),
		$('#CollapseButton').click(function () {
			$(this).hasClass('btn-disabled-negative') ||
				($('.place.place-selected').removeClass('place-selected'), $('div#ButtonRow').hide());
		}),
		$('#StudioRecentFiles').length == 0 && $('ul.navlist').css('border-bottom', 'none');
	$('#AssetList').on('click', '#load-more-assets', function () {
		var r = $(this).parent(),
			i = t(!0);
		n(r, i);
	});
});
