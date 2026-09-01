import { activityModel } from "../models/Activity.model.js";

export const getActivitiesController = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.module) filter.module = req.query.module;
    if (req.query.action) filter.action = req.query.action;
    if (req.query.userId) filter.performedBy = req.query.userId;

    const [activities, total] = await Promise.all([
      activityModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("performedBy", "fullname email role")
        .lean(),
      activityModel.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: activities,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch activities", error: error.message });
  }
};
