import {
  Accessibility,
  Dashboard,
  Event,
  Explore,
  LocationCity,
  LocationOn,
  Person,
  PostAdd,
  ReportProblem
} from '@material-ui/icons';

export const adminListMenu = {
    prefix: "admin",
    menu: [
        {
            icon: Dashboard,
            name: "Tổng quan",
            link: "/admin",
        },
        {
            icon: Person,
            name: "Người dùng",
            link: "/admin/user",
        },
        {
            icon: Accessibility,
            name: "Dịch vụ",
            link: "/admin/service",
        },
        {
            icon: LocationOn,
            name: "Địa điểm",
            link: "/admin/location",
        },
        {
            icon: LocationCity,
            name: "Tỉnh",
            link: "/admin/province",
        },
        {
            icon: Event,
            name: "Sự kiện",
            link: "/admin/event",
        },
        {
            icon: PostAdd,
            name: "Bài viết/ review",
            link: "/admin/post",
        },
        {
            icon: Explore,
            name: "Tour",
            link: "/admin/tour",
        },
        {
            icon: ReportProblem,
            name: "Báo cáo",
            link: "/admin/report",
        },
    ]
}
