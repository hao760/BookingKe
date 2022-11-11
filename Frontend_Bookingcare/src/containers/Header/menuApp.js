export const adminMenu = [
  {
    //quan ly nguoi dung
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
      },
      // {
      //   name: "menu.admin.manage-admin",
      //   link: "/system/user-admin",
      // },
      {
        //quan ly kế hoạch khám bệnh của bác sĩ
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
  {
    //quan ly phòng khám
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
      {
        name: "menu.admin.manage-detail-clinic",
        link: "/system/manage-detail-clinic",
      },
    ],
  },
  {
    //quan ly chuyen khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
      {
        name: "menu.admin.manage-detail-specialty",
        link: "/system/manage-detail-specialty",
      },
    ],
  },
  {
    //quan ly cẩm nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
      {
        name: "menu.admin.manage-detail-handbook",
        link: "/system/manage-detail-handbook",
      },
    ],
  },//dong thu 5
  {
    //quan ly cẩm nang
    name: "menu.admin.manage-packet-examination",
    menus: [
      {
        name: "menu.admin.create-packet-examination",
        link: "/system/packet_examination",
      },
      {
        name: "menu.admin.manage-detail-handbook",
        link: "/system/manage-detail-handbook",
      },
    ],
  },
];

export const doctorMenu = [
  {
    //quan ly kế hoạch khám bệnh của bác sĩ
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      {
        name: "menu.doctor.manage-patient",
        link: "/doctor/manage-patient",
      },
    ],
  },
];
/* 
 name: "menu.doctor.manage-schedule",
        menus: [
          {
            name: "menu.doctor.schedule",
            link: "/system/user-manage",
          },
        ], */

// subMenus: [
//           {
//             name: "menu.system.system-administrator.user-manage",
//             link: "/system/user-manage",
//           },
//           {
//             name: "menu.system.system-administrator.user-redux",
//             link: "/system/user-redux",
//           },
//         ],
