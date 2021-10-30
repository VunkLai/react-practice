import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import DescriptionIcon from "@mui/icons-material/Description";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { MinusSquare, PlusSquare } from "./Squares";

const StyledTreeItem = styled((props) => <TreeItem {...props} />)(
  ({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
      "& .close": {
        opacity: 0.3,
      },
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 15,
      paddingLeft: 18,
      borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
  })
);

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  height: "calc(100% - 64px) !important",
  width: "100%",
  justifyContent: "center",
  alignContent: "stretch",
}));

const Left = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "30%",
}));

const Right = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "70%",
}));

export default function CustomizedTreeView() {
  const [folder, setFolder] = React.useState([]);

  const handleClick = (event, nodeIds) => {
    let expandedId = nodeIds[0];
    if (expandedId === "root") {
      expandedId = nodeIds[1];
    }
    console.log(expandedId);
    setFolder(folders[expandedId] ? folders[expandedId] : []);
  };

  const renderTree = (nodes) => (
    <StyledTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </StyledTreeItem>
  );

  return (
    <Container>
      <Left>
        <TreeView
          aria-label="customized"
          defaultExpanded={["1"]}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          defaultEndIcon={<DescriptionIcon />}
          onNodeToggle={handleClick}
          sx={{ height: "100%", flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        >
          {renderTree(data)}
        </TreeView>
      </Left>
      <Divider orientation="vertical" variant="middle" />
      <Right>
        <a href="http://localhost/document/explorer/download?path=b/ba/ba-1.doc">
          ba-1.doc
        </a>
        {folder.length === 0 ? "請點選左側資料夾" : "資料夾內含文件："}
        <List>
          {folder.map((f) => {
            return (
              <ListItem key={f}>
                <ListItemText>{f}</ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Right>
    </Container>
  );
}
