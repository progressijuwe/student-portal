import { useState, useMemo, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useCourseRegistrationQuery } from "../../hooks/useCourseRegistrationQuery";
import { filterRegistrations } from "../../utils/filterRegistrations";
import RegistrationTabs from "../../sections/admin/registrations/RegistrationTabs";
import RegistrationToolbar from "../../sections/admin/registrations/RegistrationToolbar";
import RegistrationTable from "../../sections/admin/registrations/RegistrationTable";
import RegistrationDetailsModal from "../../sections/admin/modals/RegistrationDetailsModal";
import AddSuccessModal from "../../sections/admin/modals/AddSuccessModal";
import Pagination from "../../components/ui/Pagination";
import EntityPageShell from "../../components/ui/EntityPageShell";
import { courseRegistrationsData } from "../../data/courseRegistrationsData";

const perPage = 8;

export default function AdminCourseRegistrationsPage() {
	const { search, page, filters, setSearch, setFilters, setPage } =
		useCourseRegistrationQuery();

	const [registrations, setRegistrations] = useState([]);
	const [loading, setLoading] = useState(false);
	const [activeTab, setActiveTab] = useState("pending");
	const [modal, setModal] = useState({ type: null, data: null });
	const [debouncedSearch, setDebouncedSearch] = useState("");

	useEffect(() => {
		const t = setTimeout(() => setDebouncedSearch(search), 300);
		return () => clearTimeout(t);
	}, [search]);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setRegistrations(courseRegistrationsData);
			setLoading(false);
		}, 1000);
	}, []);

	useEffect(() => {
		setPage(1);
	}, [
		debouncedSearch,
		filters.level,
		filters.faculty,
		filters.department,
		activeTab,
	]);

	const counts = useMemo(
		() => ({
			pending: registrations.filter((r) => r.status === "pending").length,
			approved: registrations.filter((r) => r.status === "approved").length,
			rejected: registrations.filter((r) => r.status === "rejected").length,
		}),
		[registrations],
	);

	const tabFiltered = useMemo(
		() => registrations.filter((r) => r.status === activeTab),
		[registrations, activeTab],
	);

	const filtered = useMemo(
		() => filterRegistrations(tabFiltered, debouncedSearch, filters),
		[tabFiltered, debouncedSearch, filters],
	);

	const totalPages = Math.ceil(filtered.length / perPage);

	const paginated = useMemo(() => {
		const start = (page - 1) * perPage;
		return filtered.slice(start, start + perPage);
	}, [filtered, page]);

	const handleApprove = useCallback((reg) => {
		setRegistrations((prev) =>
			prev.map((r) => (r.id === reg.id ? { ...r, status: "approved" } : r)),
		);
	}, []);

	const handleReject = useCallback((reg) => {
		setRegistrations((prev) =>
			prev.map((r) => (r.id === reg.id ? { ...r, status: "rejected" } : r)),
		);
	}, []);

	const handleView = useCallback(
		(reg) => setModal({ type: "view", data: reg }),
		[],
	);
	const closeModal = useCallback(
		() => setModal({ type: null, data: null }),
		[],
	);

	return (
		<div className='flex flex-col gap-5 lg:py-6 py-8 lg:px-8 px-5'>
			<h2 className='text-xl lg:text-[30px] font-semibold'>
				Course Registration Management
			</h2>
			<div className='flex flex-col gap-4 lg:gap-3 w-full border lg:border-0 border-border lg:bg-transparent bg-white rounded-[10px]'>
				<RegistrationTabs
					activeTab={activeTab}
					counts={counts}
					onTabChange={setActiveTab}
				/>
				<RegistrationToolbar
					search={search}
					onSearch={setSearch}
					filters={filters}
					onFilterChange={setFilters}
				/>
				<RegistrationTable
					registrations={paginated}
					loading={loading}
					isPending={activeTab === "pending"}
					onView={handleView}
					onApprove={handleApprove}
					onReject={handleReject}
				/>
				{!loading && totalPages > 1 && (
					<Pagination
						page={page}
						total={filtered.length}
						perPage={perPage}
						onPageChange={setPage}
						label={`${activeTab} approval`}
					/>
				)}
				<AnimatePresence>
					{modal.type === "view" && (
						<RegistrationDetailsModal
							registration={modal.data}
							onClose={closeModal}
						/>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
