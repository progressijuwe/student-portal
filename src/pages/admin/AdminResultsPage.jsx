import { useState, useMemo, useEffect, useCallback } from "react";
import { useResultsQuery } from "../../hooks/useResultsQuery";
import { filterResults } from "../../utils/filterResults";
import ResultsTabs from "../../sections/admin/results/ResultsTabs";
import ResultsToolbar from "../../sections/admin/results/ResultsToolbar";
import ResultsTable from "../../sections/admin/results/ResultsTable";
import Pagination from "../../components/ui/Pagination";
import EntityPageShell from "../../components/ui/EntityPageShell";
import { resultsData } from "../../data/resultsData";

const perPage = 8;

export default function AdminResultsPage() {
	const { search, page, filters, setSearch, setFilters, setPage } =
		useResultsQuery();

	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [activeTab, setActiveTab] = useState("pending");
	const [debouncedSearch, setDebouncedSearch] = useState("");

	useEffect(() => {
		const t = setTimeout(() => setDebouncedSearch(search), 300);
		return () => clearTimeout(t);
	}, [search]);

	useEffect(() => {
		setPage(1);
	}, [
		debouncedSearch,
		filters.level,
		filters.faculty,
		filters.department,
		activeTab,
	]);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setResults(resultsData);
			setLoading(false);
		}, 1000);
	}, []);

	const counts = useMemo(
		() => ({
			pending: results.filter((r) => r.status === "pending").length,
			approved: results.filter((r) => r.status === "approved").length,
			rejected: results.filter((r) => r.status === "rejected").length,
		}),
		[results],
	);

	const tabFiltered = useMemo(
		() => results.filter((r) => r.status === activeTab),
		[results, activeTab],
	);

	const filtered = useMemo(
		() => filterResults(tabFiltered, debouncedSearch, filters),
		[tabFiltered, debouncedSearch, filters],
	);

	const totalPages = Math.ceil(filtered.length / perPage);

	const paginated = useMemo(() => {
		const start = (page - 1) * perPage;
		return filtered.slice(start, start + perPage);
	}, [filtered, page]);

	const handleApprove = useCallback((result) => {
		setResults((prev) =>
			prev.map((r) => (r.id === result.id ? { ...r, status: "approved" } : r)),
		);
	}, []);

	const handleReject = useCallback((result) => {
		setResults((prev) =>
			prev.map((r) => (r.id === result.id ? { ...r, status: "rejected" } : r)),
		);
	}, []);

	return (
		<EntityPageShell title='Results Management'>
			<ResultsTabs
				activeTab={activeTab}
				counts={counts}
				onTabChange={setActiveTab}
			/>
			<ResultsToolbar
				search={search}
				onSearch={setSearch}
				filters={filters}
				onFilterChange={setFilters}
			/>
			<ResultsTable
				results={paginated}
				loading={loading}
				isPending={activeTab === "pending"}
				onApprove={handleApprove}
				onReject={handleReject}
			/>
			{!loading && totalPages > 1 && (
				<Pagination
					page={page}
					total={filtered.length}
					perPage={perPage}
					onPageChange={setPage}
				/>
			)}
		</EntityPageShell>
	);
}
