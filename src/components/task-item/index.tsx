import {Task, TaskStatus} from "@/domains/task";
import {Button} from "../button";
import {CheckBox} from "../check-box";
import {Icon} from "../icon";
import {useDeleteTask, useUpdateTask} from "@/domains/task/hooks";
import {cn} from "@/utils/cn";
import {ErrorHelpers} from "@/services/error/helpers";
import {useContext} from "react";
import {ToastContext} from "@/components/toast-provider/context/toast-context";
import {ToastType} from "@/components/toast-provider/helpers/show-toast";

type Props = {
  task: Task;
};

export const TaskItem = ({ task: { id, title, priority, status } }: Props) => {
  const { showToast } = useContext(ToastContext);
  const { mutateAsync: deleteTaskAction } = useDeleteTask();
  const { mutateAsync: updateTaskAction } = useUpdateTask();

  const handleCheckBoxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.checked) {
      return;
    }

    try {
      await updateTaskAction(
        { id, data: { status: TaskStatus.DONE } },
        {
          onSuccess() {
            showToast(ToastType.SUCCESS, `Congratulations with completing your task: ${title}`);
          },
        },
      );
    } catch (error) {
      const message: string | undefined = ErrorHelpers.getMessage(error);
      if (message) {
        showToast(ToastType.ERROR, message);
      }
    }
  };

  const handleClickDelete = async () => {
    try {
      await deleteTaskAction(id, {
        onSuccess() {
          showToast(ToastType.SUCCESS, `Task successfully removed: ${title}`);
        },
      });
    } catch (error) {
      const message: string | undefined = ErrorHelpers.getMessage(error);
      if (message) {
        showToast(ToastType.ERROR, message);
      }
    }
  };

  return (
    <div
      className={cn(
        "bg-friar-gray border-2 border-friar-gray shadow-lg rounded-2xl  w-full flex items-center justify-between",
        { "border-green-500": status === TaskStatus.DONE },
      )}
    >
      <CheckBox
        onChange={handleCheckBoxChange}
        disabled={status === TaskStatus.DONE}
        checked={status === TaskStatus.DONE}
      />
      <h3 className="font-sans text-xl font-semibold truncate w-80">
        {title}{" "}
      </h3>
      <div className="flex gap-2 items-center">
        <h4 className="font-sans text-md">Priority:</h4>
        <span className="font-sans text-md">{priority}</span>
      </div>

      <Button
        onClick={handleClickDelete}
        fill={false}
        className="border-none p-4 w-fit  hover:text-red-500"
      >
        <Icon icon="icon-bin text-current text-xl " />
      </Button>
    </div>
  );
};
