"use client";

import { fileAtom, loadingAtom, renderAtom } from "@/store/atoms";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Spinner from "./Spinner";
import { dimensionsAtom } from "@/store/atoms/dimensions";

interface FileTreeNode {
  name: string;
  type: "directory" | "file";
  filePath: string; // Add filePath property
  children?: FileTreeNode[];
}

export default function MyFolderTree() {
  const [tree, setTree] = useState<FileTreeNode[]>();
  const [float, setFloat] = useState<boolean>();
  const [currentFile, setCurrentFile] = useRecoilState(fileAtom);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const render = useRecoilValue(renderAtom);
  const dimensions = useRecoilValue(dimensionsAtom);

  const newFileRef = useRef("");

  function searchTree(
    fileTrees: FileTreeNode[] | undefined,
    filter: string
  ): FileTreeNode[] {
    if (!fileTrees) return [];

    let results: FileTreeNode[] = [];

    for (const node of fileTrees) {
      // If the current node matches the filter and it's a file, add it to results
      if (
        node.type === "file" &&
        node.name.toLowerCase().includes(filter.toLowerCase())
      ) {
        results.push(node);
      }

      // If the current node is a directory and has children, recursively search its children
      if (node.type === "directory" && node.children) {
        const childrenResults = searchTree(node.children, filter);
        results = results.concat(childrenResults);
      }
    }

    return results;
  }

  useEffect(() => {
    async function getFiles() {
      try {
        setLoading(true);
        const data = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/files`);
        setTree(data.data.tree);
        setLoading(false);
      } catch (e) {
        setTimeout(getFiles, 3000);
      }
    }
    getFiles();
  }, [float, render]);

  function handleClick(node: FileTreeNode) {
    if (node.type === "directory") return;
    setCurrentFile(node);
  }

  const renderTree = (nodes: FileTreeNode[] | undefined, depth = 0) => {
    if (!nodes) return null;

    return (
      <ul>
        {nodes.map((node, index) => (
          <li
            className={`${
              node.type === "directory"
                ? "cursor-not-allowed pl-3"
                : "cursor-pointer hover:bg-gray-600 transition-colors duration-200 rounded-sm pl-3 py-0.5"
            } ${currentFile.name === node.name ? "bg-gray-700" : ""}`}
            key={index}
            onClick={() => handleClick(node)}
          >
            <span
              className="flex text-white"
              style={{ marginLeft: depth * 20 }}
            >
              {node.children ? (
                <svg
                  className="size-6"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFA000"
                    d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"
                  ></path>
                  <path
                    fill="#FFCA28"
                    d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"
                  ></path>
                </svg>
              ) : node.name.endsWith(".js") ? (
                <svg
                  className="size-6"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path fill="#f7df1e" d="M6,42V6h36v36H6z"></path>
                  <path
                    fill="#000001"
                    d="M29.538,32.947c0.692,1.124,1.444,2.201,3.037,2.201c1.338,0,2.04-0.665,2.04-1.585 c0-1.101-0.726-1.492-2.198-2.133l-0.807-0.344c-2.329-0.988-3.878-2.226-3.878-4.841c0-2.41,1.845-4.244,4.728-4.244 c2.053,0,3.528,0.711,4.592,2.573l-2.514,1.607c-0.553-0.988-1.151-1.377-2.078-1.377c-0.946,0-1.545,0.597-1.545,1.377 c0,0.964,0.6,1.354,1.985,1.951l0.807,0.344C36.452,29.645,38,30.839,38,33.523C38,36.415,35.716,38,32.65,38 c-2.999,0-4.702-1.505-5.65-3.368L29.538,32.947z M17.952,33.029c0.506,0.906,1.275,1.603,2.381,1.603 c1.058,0,1.667-0.418,1.667-2.043V22h3.333v11.101c0,3.367-1.953,4.899-4.805,4.899c-2.577,0-4.437-1.746-5.195-3.368 L17.952,33.029z"
                  ></path>
                </svg>
              ) : node.name.endsWith(".txt") ? (
                <img
                  className="size-5 mt-0.5"
                  src="https://img.icons8.com/ios/50/FFFFFF/edit-text-file.png"
                  alt="edit-text-file"
                />
              ) : node.name.endsWith(".json") ? (
                <img
                  className="size-6"
                  src="https://img.icons8.com/glyph-neue/64/FFFFFF/json.png"
                  alt="json"
                />
              ) : node.name.endsWith(".ts") ? (
                <svg
                  className="size-6"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <linearGradient
                    id="O2zipXlwzZyOse8_3L2yya_wpZmKzk11AzJ_gr1"
                    x1="15.189"
                    x2="32.276"
                    y1="-.208"
                    y2="46.737"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stop-color="#2aa4f4"></stop>
                    <stop offset="1" stop-color="#007ad9"></stop>
                  </linearGradient>
                  <rect
                    width="36"
                    height="36"
                    x="6"
                    y="6"
                    fill="url(#O2zipXlwzZyOse8_3L2yya_wpZmKzk11AzJ_gr1)"
                  ></rect>
                  <polygon
                    fill="#fff"
                    points="27.49,22 14.227,22 14.227,25.264 18.984,25.264 18.984,40 22.753,40 22.753,25.264 27.49,25.264"
                  ></polygon>
                  <path
                    fill="#fff"
                    d="M39.194,26.084c0,0-1.787-1.192-3.807-1.192s-2.747,0.96-2.747,1.986	c0,2.648,7.381,2.383,7.381,7.712c0,8.209-11.254,4.568-11.254,4.568V35.22c0,0,2.152,1.622,4.733,1.622s2.483-1.688,2.483-1.92	c0-2.449-7.315-2.449-7.315-7.878c0-7.381,10.658-4.469,10.658-4.469L39.194,26.084z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="size-6"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 300 200"
                >
                  <g
                    fill="#ffffff"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                  >
                    <g transform="scale(5.12,5.12)">
                      <path d="M7,2v46h36v-33.40625l-0.28125,-0.3125l-12,-12l-0.3125,-0.28125zM9,4h20v12h12v30h-32zM31,5.4375l8.5625,8.5625h-8.5625zM15,22v2h20v-2zM15,28v2h16v-2zM15,34v2h20v-2z"></path>
                    </g>
                  </g>
                </svg>
              )}
              &nbsp;{node.name}
            </span>
            {node.children && renderTree(node.children, depth + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div
      className="bg-[#1e1f22] min-h-96 w-72 rounded-lg hidden sm:block"
      style={{ height: `${dimensions.windowHeight - 45}px` }}
    >
      <div className="flex justify-between px-6 py-4 gap-10">
        <h2 className="text-white text-md pt-1">Project Files</h2>
        {float ? (
          <button
            onClick={async () => {
              if (newFileRef.current !== "") {
                setLoading(true);
                await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/new`, {
                  fileName: `${newFileRef.current}`,
                });
                setLoading(false);
              }
              setFloat(false);
            }}
            className="px-3 text-white flex gap-2 bg-[#1d1e22] rounded-md outline-1 outline-double py-1 text-sm hover:bg-gray-800 transition-colors duration-300"
          >
            Done
            <svg
              className="size-5"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 48 48"
            >
              <linearGradient
                id="HoiJCu43QtshzIrYCxOfCa_VFaz7MkjAiu0_gr1"
                x1="21.241"
                x2="3.541"
                y1="39.241"
                y2="21.541"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".108" stop-color="#0d7044"></stop>
                <stop offset=".433" stop-color="#11945a"></stop>
              </linearGradient>
              <path
                fill="url(#HoiJCu43QtshzIrYCxOfCa_VFaz7MkjAiu0_gr1)"
                d="M16.599,41.42L1.58,26.401c-0.774-0.774-0.774-2.028,0-2.802l4.019-4.019	c0.774-0.774,2.028-0.774,2.802,0L23.42,34.599c0.774,0.774,0.774,2.028,0,2.802l-4.019,4.019	C18.627,42.193,17.373,42.193,16.599,41.42z"
              ></path>
              <linearGradient
                id="HoiJCu43QtshzIrYCxOfCb_VFaz7MkjAiu0_gr2"
                x1="-15.77"
                x2="26.403"
                y1="43.228"
                y2="43.228"
                gradientTransform="rotate(134.999 21.287 38.873)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#2ac782"></stop>
                <stop offset="1" stop-color="#21b876"></stop>
              </linearGradient>
              <path
                fill="url(#HoiJCu43QtshzIrYCxOfCb_VFaz7MkjAiu0_gr2)"
                d="M12.58,34.599L39.599,7.58c0.774-0.774,2.028-0.774,2.802,0l4.019,4.019	c0.774,0.774,0.774,2.028,0,2.802L19.401,41.42c-0.774,0.774-2.028,0.774-2.802,0l-4.019-4.019	C11.807,36.627,11.807,35.373,12.58,34.599z"
              ></path>
            </svg>
          </button>
        ) : (
          <button
            onClick={() => setFloat(!float)}
            className="px-3 text-white flex gap-2 bg-[#1d1e22] rounded-md outline-1 outline-double py-1 text-sm hover:bg-gray-800 transition-colors duration-300"
          >
            Add File
            <img
              className="size-5"
              src="https://img.icons8.com/pastel-glyph/64/FFFFFF/add-file--v2.png"
              alt="add-file--v2"
            />
          </button>
        )}
      </div>

      <form className="max-w-md mx-auto rounded-md flex justify-center text-white">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={(e) => setFilter(e.target.value)}
            type="search"
            className="block h-10 p-4 ps-10 text-sm focus:border rounded-lg bg-[#151514] text-white"
            placeholder="Search Files"
          />
        </div>
      </form>

      <div>
        <h2 className="text-white flex items-center pl-7 pt-2">
          <img
            className="w-3 h-5"
            src="https://img.icons8.com/ios/50/FFFFFF/sort-down.png"
            alt="sort-down"
          />
          <span className="ml-1">User</span>
        </h2>
      </div>
      <div className="px-7">
        {float ? (
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <img
                className="size-5"
                src="https://img.icons8.com/ios/50/FFFFFF/new-file.png"
                alt="new-file"
              />
            </div>
            <input
              onChange={(e) => (newFileRef.current = e.target.value)}
              className="text-white bg-gray-700 rounded-sm pl-10 py-3 h-7 max-w-full"
              type="text"
              placeholder="filename"
            />
          </div>
        ) : null}
        {filter === ""
          ? renderTree(tree)
          : renderTree(searchTree(tree, filter))}
      </div>
      {loading ? <Spinner /> : null}
    </div>
  );
}