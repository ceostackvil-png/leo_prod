import React, { useState } from 'react';
import {
  Star,
  MessageSquare,
  Search,
  Trash2,
  Check,
  ShieldCheck,
  Plus
} from 'lucide-react';

const ReviewsTab = ({
  reviews = [],
  onCreateReview,
  onUpdateReviewStatus,
  onDeleteReview,
  triggerToast
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [replyingReview, setReplyingReview] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [localReplies, setLocalReplies] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newReview, setNewReview] = useState({
    customerName: '',
    productTitle: 'LEO 240 GSM Oversized Tee',
    rating: 5,
    title: '',
    comment: '',
    status: 'approved'
  });

  const filteredReviews = reviews.filter((r) => {
    const cust = r.customerName || r.userName || '';
    const comm = r.comment || '';
    const prod = r.productTitle || '';
    const q = search.toLowerCase();

    const matchSearch =
      !q ||
      cust.toLowerCase().includes(q) ||
      comm.toLowerCase().includes(q) ||
      prod.toLowerCase().includes(q);

    const matchStatus = statusFilter === 'all' || (r.status || 'approved') === statusFilter;
    const matchRating = ratingFilter === 'all' || r.rating === Number(ratingFilter);

    return matchSearch && matchStatus && matchRating;
  });

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyingReview) return;
    setLocalReplies({ ...localReplies, [replyingReview.id]: replyText });
    if (onUpdateReviewStatus) {
      await onUpdateReviewStatus(replyingReview.id, replyingReview.status || 'approved', replyText);
    } else if (triggerToast) {
      triggerToast(`Reply sent to ${replyingReview.customerName || 'customer'}!`);
    }
    setReplyingReview(null);
    setReplyText('');
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (onCreateReview) {
      await onCreateReview(newReview);
    }
    setIsAddModalOpen(false);
    setNewReview({
      customerName: '',
      productTitle: 'LEO 240 GSM Oversized Tee',
      rating: 5,
      title: '',
      comment: '',
      status: 'approved'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Customer Reviews & UGC Moderation ({filteredReviews.length})
            </h2>
            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
              Verified Buyers
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, moderate, approve, reply to, or delete customer reviews and ratings
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 text-xs font-bold text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Review</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reviews by keyword, customer, product..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-semibold text-slate-700"
        >
          <option value="all">All Moderation Status</option>
          <option value="approved">Approved & Live</option>
          <option value="pending">Pending Approval</option>
          <option value="rejected">Rejected / Hidden</option>
        </select>

        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-semibold text-slate-700"
        >
          <option value="all">All Star Ratings</option>
          <option value="5">★ 5 Stars Only</option>
          <option value="4">★ 4 Stars Only</option>
          <option value="3">★ 3 Stars & Below</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {filteredReviews.map((rev) => {
          const status = rev.status || 'approved';
          const custName = rev.customerName || rev.userName || 'Verified Buyer';
          const brandReply = localReplies[rev.id] || rev.brandReply;

          return (
            <div
              key={rev.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-xs shrink-0">
                    {custName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs">{custName}</span>
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-1.5 py-0.2 rounded border border-emerald-200 flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5" /> Verified Order
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                      Purchased: <span className="text-slate-800 font-bold">{rev.productTitle || 'LEO Classic Polo'}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="flex items-center text-amber-500 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < (rev.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : status === 'rejected'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <p className="font-semibold text-slate-900 mb-0.5">{rev.title || rev.headline || 'Exceptional Quality & Fit'}</p>
                <p className="leading-relaxed">{rev.comment || 'The 240 GSM cotton feels heavy and super premium. Perfect boxy fit just like international streetwear brands.'}</p>
              </div>

              {/* Brand Reply if any */}
              {brandReply && (
                <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 text-xs text-slate-800 space-y-1">
                  <span className="font-bold text-[#0f142b] flex items-center gap-1.5 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>LEO Care Official Reply:</span>
                  </span>
                  <p className="text-slate-700 italic">{brandReply}</p>
                </div>
              )}

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-400 font-mono">
                  {rev.createdAt || rev.date || 'Oct 26, 2026'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setReplyingReview(rev);
                      setReplyText(brandReply || '');
                    }}
                    className="px-2.5 py-1 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3 h-3 text-slate-500" />
                    <span>Reply</span>
                  </button>

                  {status !== 'approved' && (
                    <button
                      onClick={() => onUpdateReviewStatus(rev.id, 'approved')}
                      className="px-2.5 py-1 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Approve
                    </button>
                  )}

                  {status !== 'rejected' && (
                    <button
                      onClick={() => onUpdateReviewStatus(rev.id, 'rejected')}
                      className="px-2.5 py-1 text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Reject
                    </button>
                  )}

                  {onDeleteReview && (
                    <button
                      onClick={() => onDeleteReview(rev.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Review"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Review Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-black text-slate-900">Add Verified Customer Review</h3>
            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kabir Sharma"
                  value={newReview.customerName}
                  onChange={(e) => setNewReview({ ...newReview, customerName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={newReview.productTitle}
                    onChange={(e) => setNewReview({ ...newReview, productTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Star Rating</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-bold"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>★ {r} Stars</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Review Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Best Heavyweight Tee in India"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Review Comment</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share customer feedback..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-lg font-bold cursor-pointer"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {replyingReview && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-black text-slate-900">
              Reply to {replyingReview.customerName || replyingReview.userName || 'Customer'}
            </h3>
            <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border">
              "{replyingReview.comment}"
            </p>

            <form onSubmit={handleSendReply} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Official Brand Response</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Thank you for your valuable feedback! We are thrilled you love the fit..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setReplyingReview(null)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-lg font-bold cursor-pointer"
                >
                  Publish Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;
