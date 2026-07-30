(($) => {
  const socket = io();

  const hideAllButton = $('#hideAll');

  const sportSelect = $('#sportSelect');
  const goToSportButton = $('#goToSportButton');
  const resetScoreButton = $('#resetScore');

  const toggleLiveChatButton = $('#toggleLiveChat');
  const toggleChatVisibilityButton = $('#toggleChatVisibility');

  const sportPanels = $('.sport-form-panel');
  const adjustButtons = $('.button-row .controls-button.secondary');
  const textOverlayInput = $("#editable-text");

  const bottomChatInput = $("#bottom-chat");
  const rightChatInput = $("#right-chat");

  const moveChatTopLeftButton = $('#moveChatTopLeft');
  const moveChatTopRightButton = $('#moveChatTopRight');
  const moveChatBottomRightButton = $('#moveChatBottomRight');
  const moveChatBottomLeftButton = $('#moveChatBottomLeft');
  const resetFullChatViewButton = $('#resetFullChatView');

  function getActivePanel() {
    return sportPanels.filter('.is-active');
  }

  function getInputValue(input) {
    if (input.attr('type') === 'number') {
      return Number.parseInt(input.val(), 10) || 0;
    }

    return input.val();
  }

  function setInputValue(input, value) {
    if (input.attr('type') === 'number') {
      input.val(String(value));
      return;
    }

    input.val(value);
  }

  function resetPanel(panel) {
    panel.find('input[data-field]').each(function () {
      const input = $(this);
      const defaultValue = input.attr('data-default') || '';
      setInputValue(input, defaultValue);
    });

    emitPanelSocket(panel);
  }

  function emitPanelSocket(panel) {
    const sport = panel.attr('data-sport');
    const values = {};

    panel.find('input[data-field]').each(function () {
      const input = $(this);
      const field = input.attr('data-field');
      values[field] = getInputValue(input);
    });

    if (sport === 'soccer') {
      socket.emit('scoreboard_soccer', {
        team1: values.team1Score,
        team2: values.team2Score,
        teamName1: values.team1Name,
        teamName2: values.team2Name,
        info: values.info
      });
      return;
    }

    if (sport === 'frisbee') {
      socket.emit('scoreboard_frisbee', {
        header: values.header,
        score1: values.team1Score,
        score2: values.team2Score,
        teamName1: values.team1Name,
        teamName2: values.team2Name
      });
      return;
    }

    if (sport === 'basketball') {
      socket.emit('scoreboard_basketball', {
        header: values.header,
        score1: values.team1Score,
        score2: values.team2Score,
        teamName1: values.team1Name,
        teamName2: values.team2Name
      });
      return;
    }

    if (sport === 'volleyball') {
      socket.emit('scoreboard_volleyball', {
        team1: values.team1Score,
        team2: values.team2Score,
        teamName1: values.team1Name,
        teamName2: values.team2Name,
        set1: values.set1Score,
        set2: values.set2Score
      });
    }
  }

  function emitTextOverlaySocket(text) {
    socket.emit('text_overlay', text);
  }

  function emitLiveChatSocket(isVisible, isCompact, bottom = null, right = null) {
    socket.emit('live_chat', {
      visible: isVisible,
      compact: isCompact,
      bottom: bottom,
      right: right
    });
    return;
  }

  function emitSportTypeChange(sport) {
    socket.emit('sport_type', sport);
  }

  function activateSportPanel(sport) {
    sportPanels.removeClass('is-active');
    const selectedPanel = sportPanels.filter(`[data-sport="${sport}"]`);
    if (selectedPanel.length) {
      selectedPanel.addClass('is-active');
      resetPanel(selectedPanel);
    }
  }

  if (sportSelect.length) {
    sportSelect.on('change', () => {
      activateSportPanel(sportSelect.val());
      emitSportTypeChange(sportSelect.val());
    });
  }

  resetScoreButton.on('click', () => {
    const selectedPanel = getActivePanel();
    if (selectedPanel.length) {
      resetPanel(selectedPanel);
    }
  });

  adjustButtons.on('click', (event) => {
    const button = $(event.currentTarget);
    const targetField = button.attr('data-target');
    const step = parseInt(button.attr('data-step'), 10) || 1;
    const activePanel = getActivePanel();
    const targetInput = activePanel.find(`input[data-field="${targetField}"]`);

    if (!targetInput.length) {
      return;
    }

    const currentValue = Number.parseInt(targetInput.val(), 10) || 0;
    const nextValue = Math.max(0, currentValue + step);
    targetInput.val(String(nextValue));
    emitPanelSocket(activePanel);
  });

  sportPanels.on('input change', 'input[data-field]', function () {
    emitPanelSocket($(this).closest('.sport-form-panel'));
  });

  if (toggleLiveChatButton.length) {
    toggleLiveChatButton.on('click', () => {
        console.log('Toggle Live Chat button clicked');
      const visible = toggleLiveChatButton.attr('data-visible') === 'true';
      emitLiveChatSocket(!visible, null);
      toggleLiveChatButton.attr('data-visible', String(!visible));
      toggleLiveChatButton.text(!visible ? 'Hide Live Chat' : 'Show Live Chat');
    });
  }

  if (toggleChatVisibilityButton.length) {
    toggleChatVisibilityButton.on('click', () => {
      const compact = toggleChatVisibilityButton.attr('data-compact') === 'true';
      emitLiveChatSocket(null, !compact);
      toggleChatVisibilityButton.attr('data-compact', String(!compact));
      toggleChatVisibilityButton.text(!compact ? 'Change to Full View' : 'Change to Compact View');
    });
  }

  bottomChatInput.change(() => {
    emitLiveChatSocket(null, null, bottomChatInput.val(), null);
  });

  rightChatInput.change(() => {
    emitLiveChatSocket(null, null, null, rightChatInput.val());
  });

  textOverlayInput.change(() => {	
    emitTextOverlaySocket(textOverlayInput.val());
	});

  moveChatTopLeftButton.on('click', () => {
    emitLiveChatSocket(null, null, 700, 1500);
    bottomChatInput.val(700);
    rightChatInput.val(1500);
  });

  moveChatTopRightButton.on('click', () => {
    emitLiveChatSocket(null, null, 700, 0);
    bottomChatInput.val(700);
    rightChatInput.val(0);
  });

  moveChatBottomRightButton.on('click', () => {
    emitLiveChatSocket(null, null, 0, 0);
    bottomChatInput.val(0);
    rightChatInput.val(0);
  });

  moveChatBottomLeftButton.on('click', () => {
    emitLiveChatSocket(null, null, 0, 1500);
    bottomChatInput.val(0);
    rightChatInput.val(1500);
  });

  resetFullChatViewButton.on('click', () => {
    emitLiveChatSocket(null, false, 190, 103);
    toggleChatVisibilityButton.attr('data-compact', 'false');
    toggleChatVisibilityButton.text('Change to Compact View');
    bottomChatInput.val(190);
    rightChatInput.val(103);
  });

  hideAllButton.on('click', () => {
    emitLiveChatSocket(false, null, null, null);
    toggleLiveChatButton.attr('data-visible', 'false');
    toggleLiveChatButton.text('Show Live Chat');

    activateSportPanel('none');
    emitSportTypeChange('none');
    sportSelect.val('none');
    
    emitTextOverlaySocket('');
    textOverlayInput.val('');
  });

  activateSportPanel(sportSelect.val() || 'none');
})(window.jQuery);
