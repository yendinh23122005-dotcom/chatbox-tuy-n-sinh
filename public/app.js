const majors = [
  { id: 'qtkd', code: '7340101', name: 'Quản trị kinh doanh', category: 'kinh-te', description: 'Tổ chức, vận hành và phát triển doanh nghiệp trong môi trường năng động.', tags: [['Kinh tế', 'violet'], ['Tư duy chiến lược', 'peach']] },
  { id: 'ktqt', code: '7310106', name: 'Kinh tế quốc tế', category: 'kinh-te', description: 'Khám phá thương mại, đầu tư và những chuyển động của nền kinh tế toàn cầu.', tags: [['Kinh tế', 'violet'], ['Toàn cầu', 'mint']] },
  { id: 'truyenthong', code: '7320104', name: 'Truyền thông đa phương tiện', category: 'xa-hoi', description: 'Kể những câu chuyện có sức lan tỏa bằng hình ảnh, âm thanh và công nghệ.', tags: [['Sáng tạo', 'peach'], ['Truyền thông', 'violet']] },
  { id: 'congtacxahoi', code: '7760101', name: 'Công tác xã hội', category: 'xa-hoi', description: 'Đồng hành cùng cộng đồng và tạo ra những thay đổi tích cực, bền vững.', tags: [['Cộng đồng', 'mint'], ['Con người', 'peach']] },
  { id: 'cntt', code: '7480201', name: 'Công nghệ thông tin', category: 'cong-nghe', description: 'Xây dựng sản phẩm số, giải quyết vấn đề bằng tư duy logic và công nghệ.', tags: [['Công nghệ', 'violet'], ['Logic', 'mint']] },
  { id: 'thietke', code: '7210403', name: 'Thiết kế đồ họa', category: 'cong-nghe', description: 'Biến ý tưởng thành ngôn ngữ thị giác ấn tượng và giàu cảm xúc.', tags: [['Thiết kế', 'peach'], ['Sáng tạo', 'violet']] }
];

const responseBank = [
  { keys: ['ngành', 'nganh', 'đào tạo', 'dao tao', 'chương trình', 'chuong trinh'], reply: 'Theo phạm vi báo cáo, AdmitBot có thể giúp bạn khám phá các nhóm ngành như Kinh tế & kinh doanh, Xã hội & truyền thông và Công nghệ. Bạn có thể mở mục “Tra cứu ngành” ở sidebar để xem từng ngành, hoặc kể mình nghe bạn thích làm việc với con người, con số hay ý tưởng nhé.', topic: 'Ngành đào tạo' },
  { keys: ['phương thức', 'phuong thuc', 'xét tuyển', 'xet tuyen', 'tuyển sinh', 'tuyen sinh'], reply: 'Báo cáo xác định chatbot có nhiệm vụ tư vấn phương thức xét tuyển và tổ hợp xét tuyển. Vì phương thức, chỉ tiêu có thể cập nhật theo từng năm, bạn hãy xem đây là định hướng ban đầu và kiểm tra đề án tuyển sinh chính thức của Học viện trước khi nộp hồ sơ.', topic: 'Xét tuyển' },
  { keys: ['học phí', 'hoc phi', 'chi phí', 'chi phi', 'tiền học', 'tien hoc'], reply: 'Mình có thể giúp bạn ước tính và so sánh theo nhóm ngành, nhưng báo cáo không cung cấp một mức học phí chính thức cố định. Học phí dự kiến cần được xác nhận theo đề án tuyển sinh của từng năm và thông báo từ Học viện Phụ nữ Việt Nam.', topic: 'Học phí' },
  { keys: ['tổ hợp', 'to hop', 'môn', 'mon thi'], reply: 'Tổ hợp xét tuyển là một trong những nội dung chính AdmitBot được thiết kế để hỗ trợ. Bạn cho mình biết bạn đang mạnh môn nào hoặc muốn xét theo phương thức nào, mình sẽ gợi ý hướng tìm hiểu phù hợp. Nhớ xác minh tổ hợp chính thức theo năm nhé.', topic: 'Tổ hợp' },
  { keys: ['hồ sơ', 'ho so', 'đăng ký', 'dang ky', 'giấy tờ', 'giay to'], reply: 'Trong phạm vi MVP, chatbot tập trung vào tra cứu và đăng ký tư vấn, chưa thay thế quy trình nộp hồ sơ trực tuyến. Bạn có thể chuẩn bị thông tin cá nhân, kết quả học tập và theo dõi hướng dẫn hồ sơ chính thức của Học viện.', topic: 'Hồ sơ' },
  { keys: ['chọn ngành', 'chon nganh', 'phù hợp', 'phu hop', 'định hướng', 'dinh huong', 'sở thích', 'so thich', 'chưa biết'], reply: 'Mình rất sẵn lòng cùng bạn định hướng. Hãy thử trả lời 1 câu: bạn thích (1) phân tích & kinh doanh, (2) sáng tạo & kể chuyện, (3) công nghệ & giải quyết vấn đề, hay (4) làm việc vì cộng đồng? Mình sẽ thu hẹp lựa chọn từ đó.', topic: 'Định hướng' },
  { keys: ['gemini', 'ai', 'chatbot', 'báo cáo', 'bao cao'], reply: 'Theo báo cáo nhóm 5, hệ thống hướng tới chatbot dùng LLM để hiểu ngôn ngữ tự nhiên, có thể hỗ trợ 24/7, lưu lịch sử hội thoại và giảm tải các câu hỏi lặp lại cho cán bộ tuyển sinh. Bản này là mô phỏng giao diện MVP của ý tưởng đó.', topic: 'Về AdmitBot' }
];

const state = {
  history: JSON.parse(localStorage.getItem('admitbot-history') || '[]'),
  saved: JSON.parse(localStorage.getItem('admitbot-saved') || '[]'),
  questions: Number(localStorage.getItem('admitbot-questions') || 0),
  topics: JSON.parse(localStorage.getItem('admitbot-topics') || '{}'),
  currentView: 'chat'
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const conversation = $('#conversation');
const input = $('#chatInput');
const form = $('#chatForm');
const typing = $('#typingIndicator');

function saveState() {
  localStorage.setItem('admitbot-history', JSON.stringify(state.history.slice(0, 12)));
  localStorage.setItem('admitbot-saved', JSON.stringify(state.saved));
  localStorage.setItem('admitbot-questions', String(state.questions));
  localStorage.setItem('admitbot-topics', JSON.stringify(state.topics));
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[char]));
}

function timeLabel(date) {
  const minutes = Math.max(0, Math.round((Date.now() - date) / 60000));
  if (minutes < 1) return 'vừa xong';
  if (minutes < 60) return `${minutes} phút trước`;
  return `${Math.round(minutes / 60)} giờ trước`;
}

function renderHistory() {
  const list = $('#historyList');
  if (!state.history.length) {
    list.innerHTML = '<div class="history-empty">Các cuộc trò chuyện bạn bắt đầu sẽ xuất hiện ở đây.</div>';
    return;
  }
  list.innerHTML = state.history.map((item, index) => `<button class="history-item" data-history="${index}" type="button"><span>◌</span><span>${escapeHtml(item.title)}</span></button>`).join('');
  $$('.history-item').forEach((button) => button.addEventListener('click', () => {
    showView('chat');
    addUserMessage(state.history[Number(button.dataset.history)].title, false);
    showToast('Đã mở lại chủ đề trò chuyện');
  }));
}

function addUserMessage(text, track = true) {
  const row = document.createElement('div');
  row.className = 'message-row user-message';
  row.innerHTML = `<div class="message-stack"><div class="message-meta"><strong>Bạn</strong><span>vừa xong</span></div><div class="message-bubble user-bubble">${escapeHtml(text).replace(/\n/g, '<br>')}</div></div>`;
  conversation.appendChild(row);
  conversation.scrollIntoView({ behavior: 'smooth', block: 'end' });
  if (track) {
    state.questions += 1;
    state.history.unshift({ title: text, date: Date.now() });
    state.history = state.history.filter((item, index, arr) => index === arr.findIndex((entry) => entry.title === item.title));
    renderHistory();
    saveState();
  }
}

function getResponse(text) {
  const normalized = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const found = responseBank.find((item) => item.keys.some((key) => normalized.includes(key.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))));
  if (found) return found;
  if (normalized.includes('1') || normalized.includes('kinh doanh') || normalized.includes('con so')) return { reply: 'Nếu bạn thích phân tích, lập kế hoạch và nhìn thấy cách một tổ chức vận hành, Quản trị kinh doanh hoặc Kinh tế quốc tế có thể là hai hướng đáng khám phá. Mình có thể mở thẻ ngành để bạn so sánh thêm.', topic: 'Định hướng' };
  if (normalized.includes('2') || normalized.includes('sang tao') || normalized.includes('ke chuyen')) return { reply: 'Với tình yêu dành cho ý tưởng và cách kể chuyện, Truyền thông đa phương tiện hoặc Thiết kế đồ họa sẽ là hai lựa chọn thú vị. Hãy thử xem mô tả ngành trong mục Tra cứu ngành nhé.', topic: 'Định hướng' };
  if (normalized.includes('3') || normalized.includes('cong nghe') || normalized.includes('logic')) return { reply: 'Nếu bạn thích xây dựng, thử nghiệm và giải quyết vấn đề bằng logic, Công nghệ thông tin là hướng nên tìm hiểu. Bạn có muốn mình nói thêm về cách chuẩn bị nền tảng không?', topic: 'Định hướng' };
  if (normalized.includes('4') || normalized.includes('cong dong') || normalized.includes('xa hoi')) return { reply: 'Nếu bạn muốn làm việc gần con người và tạo tác động cho cộng đồng, Công tác xã hội là một hướng giàu ý nghĩa để khám phá.', topic: 'Định hướng' };
  return { reply: 'Mình đã ghi nhận câu hỏi của bạn. Trong phạm vi báo cáo, mình hỗ trợ tốt nhất các chủ đề: ngành đào tạo, phương thức & tổ hợp xét tuyển, học phí, hồ sơ và gợi ý ngành phù hợp. Bạn muốn bắt đầu từ đâu?', topic: 'Khác' };
}

function addBotMessage(text, topic) {
  const row = document.createElement('div');
  row.className = 'message-row bot-message';
  row.innerHTML = `<div class="bot-avatar">✦</div><div class="message-stack"><div class="message-meta"><strong>AdmitBot</strong><span>vừa xong</span></div><div class="message-bubble bot-bubble"><p>${escapeHtml(text)}</p><div class="welcome-tags"><span>${escapeHtml(topic || 'Tư vấn tuyển sinh')}</span><span>Nhớ xác minh theo năm</span></div></div></div>`;
  conversation.appendChild(row);
  conversation.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function handleMessage(text) {
  const clean = text.trim();
  if (!clean) return;
  addUserMessage(clean);
  input.value = '';
  input.style.height = 'auto';
  typing.hidden = false;
  const result = getResponse(clean);
  state.topics[result.topic] = (state.topics[result.topic] || 0) + 1;
  saveState();
  window.setTimeout(() => {
    typing.hidden = true;
    addBotMessage(result.reply, result.topic);
    renderStats();
  }, 650);
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2400);
}

function showView(view) {
  const labels = { chat: 'Trợ lý AI', majors: 'Tra cứu ngành', saved: 'Ngành đã quan tâm', stats: 'Thống kê của bạn' };
  state.currentView = view;
  ['chat', 'majors', 'saved', 'stats'].forEach((name) => $(`#${name}View`).classList.toggle('hidden', name !== view));
  $$('.nav-item').forEach((button) => button.classList.toggle('active', button.dataset.view === view));
  $('#pageTitle').textContent = labels[view];
  if (view === 'majors') renderMajors();
  if (view === 'saved') renderSaved();
  if (view === 'stats') renderStats();
  $('#sidebar').classList.remove('open');
}

function majorCard(major) {
  const saved = state.saved.includes(major.id);
  return `<article class="major-card"><div class="major-card-top"><span class="major-code">MÃ NGÀNH ${major.code}</span><button class="save-major ${saved ? 'saved' : ''}" data-save="${major.id}" type="button" title="${saved ? 'Bỏ lưu' : 'Lưu ngành'}">${saved ? '♥' : '♡'}</button></div><h3>${major.name}</h3><p>${major.description}</p><div class="major-tags">${major.tags.map(([tag, color]) => `<span class="major-tag ${color}">${tag}</span>`).join('')}</div></article>`;
}

function bindSaveButtons() {
  $$('.save-major').forEach((button) => button.addEventListener('click', () => {
    const id = button.dataset.save;
    state.saved = state.saved.includes(id) ? state.saved.filter((savedId) => savedId !== id) : [...state.saved, id];
    saveState();
    renderMajors();
    renderSaved();
    updateSavedCount();
    showToast(state.saved.includes(id) ? 'Đã lưu ngành vào danh sách quan tâm' : 'Đã bỏ ngành khỏi danh sách quan tâm');
  }));
}

function renderMajors(filter = 'all', query = '') {
  const grid = $('#majorGrid');
  const normalized = query.toLowerCase();
  const visible = majors.filter((major) => (filter === 'all' || major.category === filter) && (!normalized || `${major.name} ${major.description}`.toLowerCase().includes(normalized)));
  grid.innerHTML = visible.length ? visible.map(majorCard).join('') : '<div class="history-empty">Chưa tìm thấy ngành phù hợp. Thử một từ khóa khác nhé.</div>';
  bindSaveButtons();
}

function renderSaved() {
  const savedMajors = majors.filter((major) => state.saved.includes(major.id));
  $('#savedGrid').innerHTML = savedMajors.map(majorCard).join('');
  $('#savedSummaryCount').textContent = savedMajors.length;
  bindSaveButtons();
}

function updateSavedCount() { $('#savedCount').textContent = state.saved.length; $('#savedStat').textContent = state.saved.length; }

function renderStats() {
  updateSavedCount();
  $('#questionStat').textContent = state.questions;
  const topicEntries = Object.entries(state.topics).sort((a, b) => b[1] - a[1]);
  $('#topicStat').textContent = topicEntries[0]?.[0] || '—';
  $('#activityTotal').textContent = `${Object.values(state.topics).reduce((sum, value) => sum + value, 0)} lượt`;
  const chartTopics = ['Ngành đào tạo', 'Xét tuyển', 'Học phí', 'Định hướng', 'Hồ sơ'];
  const max = Math.max(1, ...chartTopics.map((topic) => state.topics[topic] || 0));
  $('#barChart').innerHTML = chartTopics.map((topic) => { const value = state.topics[topic] || 0; return `<div class="bar-col"><span class="bar-value">${value}</span><div class="bar" style="height:${Math.max(4, (value / max) * 105)}px"></div><span class="bar-label">${topic}</span></div>`; }).join('');
}

form.addEventListener('submit', (event) => { event.preventDefault(); handleMessage(input.value); });
input.addEventListener('keydown', (event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); form.requestSubmit(); } });
input.addEventListener('input', () => { input.style.height = 'auto'; input.style.height = `${Math.min(input.scrollHeight, 110)}px`; });
$$('[data-prompt]').forEach((button) => button.addEventListener('click', () => { showView('chat'); handleMessage(button.dataset.prompt); }));
$$('.nav-item').forEach((button) => button.addEventListener('click', () => showView(button.dataset.view)));
$('#newChatButton').addEventListener('click', () => { conversation.innerHTML = ''; addBotMessage('Một cuộc trò chuyện mới đã sẵn sàng. Bạn muốn bắt đầu khám phá ngành học, phương thức xét tuyển hay học phí?', 'Bắt đầu mới'); showView('chat'); showToast('Đã tạo đoạn chat mới'); });
$('#clearHistoryButton').addEventListener('click', () => { state.history = []; saveState(); renderHistory(); showToast('Đã xóa lịch sử trò chuyện'); });
$('#mobileMenuButton').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
$('#themeButton').addEventListener('click', () => { document.body.classList.toggle('dark'); localStorage.setItem('admitbot-dark', document.body.classList.contains('dark')); });
$('#helpButton').addEventListener('click', () => $('#helpModal').classList.remove('hidden'));
$('#closeHelp').addEventListener('click', () => $('#helpModal').classList.add('hidden'));
$('#helpModal').addEventListener('click', (event) => { if (event.target.id === 'helpModal') event.currentTarget.classList.add('hidden'); });
$('#majorSearch').addEventListener('input', (event) => { const active = $('.filter-chip.active')?.dataset.filter || 'all'; renderMajors(active, event.target.value); });
$$('.filter-chip').forEach((button) => button.addEventListener('click', () => { $$('.filter-chip').forEach((item) => item.classList.remove('active')); button.classList.add('active'); renderMajors(button.dataset.filter, $('#majorSearch').value); }));

if (localStorage.getItem('admitbot-dark') === 'true') document.body.classList.add('dark');
renderHistory();
updateSavedCount();
renderStats();
