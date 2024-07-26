"use client";
import { BASE_URL } from "@/lib/constants";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { DataStructure, ListingTableProps } from "..";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HardDriveDownloadIcon } from "lucide-react";

const ListingTable = () => {
  const [listing, setListing] = useState<ListingTableProps[]>();

  const getListing = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/inputlist`);
      const listData = data.map((item: DataStructure) => ({
        status: item.Status,
        email: item.input_data.email,
        trends: item.input_data.Trends,
        geography: item.input_data.geography,
        folderName: item.Foldername,
        fileName: item.input_data.filename,
      }));
      setListing(listData);
    } catch (error) {
      console.log("Error");
    }
  }, []);

  useEffect(() => {
    getListing();
  }, [getListing]);

  const downloadExcelToLocal = async (folderName: string, fileName: string) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/DownloadFile/${folderName}`,
        {
          responseType: "blob", // Important to set the response type to 'blob'
          headers: {
            "Content-Type":
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          },
        }
      );

      // Create a blob from the response
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a link element
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "file";

      // Append the link to the body
      document.body.appendChild(a);

      // Programmatically click the link to trigger the download
      a.click();

      // Clean up and remove the link
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error while downloading excel:", error);
    }
  };

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[500px]">File Name</TableHead>
            <TableHead>Geography</TableHead>
            <TableHead>Trends</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listing &&
            listing.reverse().map((list, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{list.folderName}</TableCell>
                <TableCell>{list.geography}</TableCell>
                <TableCell>{list.trends}</TableCell>
                <TableCell>{list.email}</TableCell>
                <TableCell className="text-right">
                  {list.status === true ? (
                    <HardDriveDownloadIcon
                      onClick={() =>
                        downloadExcelToLocal(list.folderName, list.fileName)
                      }
                      className="ml-auto w-4 h-4 text-blue-400 cursor-pointer"
                    />
                  ) : (
                    "Processing"
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListingTable;
