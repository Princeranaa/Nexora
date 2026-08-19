import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddEmployee } from "../hooks/employeeHook";
import { ChevronLeft } from "lucide-react";

const AddEmployee = () => {
  const navigate = useNavigate();
  const { mutateAsync: addEmployee, isPending } = useAddEmployee();

  const [formData, setFormData] = useState({
    fullname: { firstname: "", lastname: "" },
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "firstname" || name === "lastname") {
      setFormData((prev) => ({
        ...prev,
        fullname: { ...prev.fullname, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.fullname.firstname || !formData.fullname.lastname || !formData.email || !formData.password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      await addEmployee(formData);
      navigate("/home/employee");
    } catch (err) {
      setError(err?.response?.data?.message || "An error occurred while creating the employee.");
    }
  };

  return (
    <div className="h-full min-h-0 p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/home/employee")}
            className="
              p-2
              rounded-[var(--radius-md)]
              hover:bg-[var(--bg-hover)]
              text-[var(--text-secondary)]
              transition-colors
              cursor-pointer
            "
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">
              Add New Employee
            </h1>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
              Fill in the details to create a new employee account.
            </p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div
        className="
          flex-1
          min-h-0
          overflow-y-auto
          rounded-[var(--radius-md)]
          border border-[var(--border-color)]
          bg-[var(--bg-card)]
          shadow-[var(--shadow-md)]
          p-6
        "
      >
        <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-6">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-md border border-red-500/20">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text-primary)]">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.fullname.firstname}
                onChange={handleChange}
                placeholder="John"
                disabled={isPending}
                className="
                  w-full px-3 py-2
                  rounded-lg
                  bg-[var(--bg-surface)]
                  border border-[var(--border-color)]
                  text-[var(--text-primary)]
                  placeholder:text-[var(--text-muted)]
                  text-sm
                  outline-none
                  focus:border-[var(--tertiary)]
                  transition-colors
                  disabled:opacity-50
                "
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text-primary)]">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.fullname.lastname}
                onChange={handleChange}
                placeholder="Doe"
                disabled={isPending}
                className="
                  w-full px-3 py-2
                  rounded-lg
                  bg-[var(--bg-surface)]
                  border border-[var(--border-color)]
                  text-[var(--text-primary)]
                  placeholder:text-[var(--text-muted)]
                  text-sm
                  outline-none
                  focus:border-[var(--tertiary)]
                  transition-colors
                  disabled:opacity-50
                "
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[var(--text-primary)]">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              disabled={isPending}
              className="
                w-full px-3 py-2
                rounded-lg
                bg-[var(--bg-surface)]
                border border-[var(--border-color)]
                text-[var(--text-primary)]
                placeholder:text-[var(--text-muted)]
                text-sm
                outline-none
                focus:border-[var(--tertiary)]
                transition-colors
                disabled:opacity-50
              "
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[var(--text-primary)]">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={isPending}
              className="
                w-full px-3 py-2
                rounded-lg
                bg-[var(--bg-surface)]
                border border-[var(--border-color)]
                text-[var(--text-primary)]
                placeholder:text-[var(--text-muted)]
                text-sm
                outline-none
                focus:border-[var(--tertiary)]
                transition-colors
                disabled:opacity-50
              "
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-color)]">
            <button
              type="button"
              onClick={() => navigate("/home/employee")}
              disabled={isPending}
              className="
                px-4 py-2
                rounded-[var(--radius-md)]
                border border-[var(--border-color)]
                text-[var(--text-secondary)]
                text-sm font-medium
                hover:bg-[var(--bg-hover)]
                transition-colors
                cursor-pointer
                disabled:opacity-50
              "
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isPending}
              className="
                px-4 py-2
                rounded-[var(--radius-md)]
                bg-[var(--tertiary)]
                text-black
                text-sm font-medium
                hover:opacity-90
                transition-opacity
                cursor-pointer
                disabled:opacity-70
                disabled:cursor-not-allowed
                flex items-center gap-2
              "
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Employee"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
